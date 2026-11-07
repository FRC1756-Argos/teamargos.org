/**
 * Argos Big Board backend (Google Apps Script, bound to the Big Board Sheet).
 *
 * Every request must include the team passcode (Script Property PASSCODE).
 * Without it, no student data is returned.
 *
 *   GET  ?view=ping&code=...      -> { ok: true }                 (checks passcode)
 *   GET  ?view=roster&code=...    -> { ok: true, students: [...] }
 *   GET  ?view=board&code=...     -> { ok: true, here, rosterCount, announcements, deadlines }
 *   POST {"action":"set","items":[{"id":"Alex Rivera","checkedIn":true,"at":"<ISO time>"}],"code":"..."}
 *                                 -> { ok: true, students: [{...} or { id, error }] }
 *   POST {"action":"toggle","id":"Alex Rivera","code":"..."}
 *                                 -> { ok: true, student: {...} }   (older single-tap form)
 *   POST {"action":"tasks.reorder","project":10,"ids":["PVTI_...", ...],"code":"..."}
 *                                 -> { ok: true, tasks }   (board-only priority order)
 *
 * Admin (Script Property ADMIN_PASSCODE instead of PASSCODE):
 *   GET  ?view=admin&code=...     -> { ok: true, announcements, deadlines } (all rows, with ids)
 *   POST {"action":"announcement.add|update|delete", ...}
 *   POST {"action":"deadline.add|update|delete", ...}
 *                                 -> same as GET ?view=admin, after the change
 *   GET  ?view=sessions&date=yyyy-MM-dd   -> { ok: true, date, sessions, students }
 *   GET  ?view=sessionDays&month=yyyy-MM  -> { ok: true, days: { "yyyy-MM-dd": count } }
 *   POST {"action":"session.add|update|delete", ...}
 *                                 -> same as GET ?view=sessions for the day being viewed
 *   GET  ?view=hours              -> { ok: true, settings, today, meetingDays, students }
 *   POST {"action":"settings.update","seasonStart":"yyyy-MM-dd","weeklyGoal":9}
 *   POST {"action":"weekGoal.set","week":3,"goal":6}      (goal "" = back to the default)
 *                                 -> same as GET ?view=hours
 *
 * POST bodies are sent as Content-Type: text/plain to avoid a CORS preflight.
 * See README.md in this folder for setup and deployment.
 */

const SHEET = {
  ROSTER: 'Roster',
  PUNCHES: 'Punches',
  SESSIONS: 'Sessions',
  ANNOUNCEMENTS: 'Announcements',
  DEADLINES: 'Deadlines',
};

const HEADERS = {
  [SHEET.ROSTER]: ['First Name', 'Last Name', 'Subteam', 'Active'],
  [SHEET.PUNCHES]: ['Timestamp', 'Name', 'Action', 'Source'],
  [SHEET.SESSIONS]: ['Name', 'Date', 'In', 'Out', 'Hours', 'Auto Closed'],
  [SHEET.ANNOUNCEMENTS]: ['Text', 'Show From', 'Show Until', 'ID'],
  [SHEET.DEADLINES]: ['Title', 'Date', 'Category', 'ID'],
};

// Length limits for text entered on the admin page.
const MAX_ANNOUNCEMENT = 300;
const MAX_TITLE = 120;
const MAX_CATEGORY = 40;

// The board lists deadlines from today through this many days ahead.
const DEADLINE_WINDOW_DAYS = 60;

// Sessions column numbers (1-based), matching HEADERS above.
const SESSION_COL = { NAME: 1, DATE: 2, IN: 3, OUT: 4, HOURS: 5, AUTO: 6 };

// A second tap on the same name within this window is ignored (double tap).
// Only used by the single "toggle" action; "set" is safe to repeat.
const DOUBLE_TAP_MS = 5000;
// Most items one "set" request may carry.
const MAX_BATCH = 100;
// Tap times from the kiosk are trusted only within this window, so a wrong
// tablet clock can't record wild times. Older or future taps use server time.
const MAX_TAP_AGE_MS = 12 * 36e5;
const MAX_TAP_SKEW_MS = 2 * 60 * 1000;
// Delay on a wrong passcode to slow down guessing.
const BAD_CODE_DELAY_MS = 1500;
// How many recent punches to scan when checking for a double tap.
const RECENT_PUNCH_ROWS = 200;

class ClientError_ extends Error {}

// ---------------------------------------------------------------------------
// Web app entry points
// ---------------------------------------------------------------------------

function doGet(e) {
  return respond_(() => {
    const p = (e && e.parameter) || {};
    const adminView = ADMIN_VIEWS[p.view];
    if (adminView) {
      requireCode_(p.code, 'ADMIN_PASSCODE');
      return { ok: true, ...withLock_(() => adminView(p)) };
    }
    requireCode_(p.code);
    switch (p.view) {
      case 'ping':
        return { ok: true };
      case 'roster':
        return { ok: true, students: getRoster_() };
      case 'board':
        return { ok: true, ...getBoard_() };
      default:
        throw new ClientError_('unknown view');
    }
  });
}

function doPost(e) {
  return respond_(() => {
    let body;
    try {
      body = JSON.parse(e.postData.contents);
    } catch (err) {
      throw new ClientError_('bad request');
    }
    const adminAction = ADMIN_ACTIONS[body.action];
    if (adminAction) {
      requireCode_(body.code, 'ADMIN_PASSCODE');
      // Session actions return that day's sessions; the others return all
      // reminders and deadlines.
      return { ok: true, ...withLock_(() => adminAction(body) || getAdminData_()) };
    }
    requireCode_(body.code);
    switch (body.action) {
      case 'set':
        return { ok: true, students: setMany_(body.items, 'kiosk') };
      case 'toggle':
        return { ok: true, student: toggle_(String(body.id || ''), 'kiosk') };
      case 'tasks.reorder':
        return { ok: true, tasks: reorderTasks_(body.project, body.ids) };
      default:
        throw new ClientError_('unknown action');
    }
  });
}

function respond_(fn) {
  let result;
  try {
    result = fn();
  } catch (err) {
    if (err instanceof ClientError_) {
      result = { ok: false, error: err.message };
    } else {
      console.error(err);
      result = { ok: false, error: 'server error' };
    }
  }
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Checks code against a Script Property: PASSCODE (team) or ADMIN_PASSCODE. */
function requireCode_(code, property) {
  property = property || 'PASSCODE';
  const expected = PropertiesService.getScriptProperties().getProperty(property);
  if (!expected) throw new ClientError_(property === 'PASSCODE' ? 'passcode not configured' : 'admin passcode not configured');
  if (typeof code !== 'string' || code !== expected) {
    Utilities.sleep(BAD_CODE_DELAY_MS);
    throw new ClientError_('unauthorized');
  }
}

// ---------------------------------------------------------------------------
// Roster and check-in
// ---------------------------------------------------------------------------

/** Active roster entries with their current in/out state. */
function getRoster_() {
  const { open, todayMs } = readSessions_();
  return readRoster_().map((p) => studentState_(p, open[p.id], todayMs[p.id]));
}

/**
 * Reads the Roster tab. Columns are found by header name, so their order
 * doesn't matter. "First Name" and "Last Name" are required; "Subteam" and
 * "Active" are optional.
 *
 * Each person gets:
 *   id   - "First Last", stored in Punches/Sessions and sent by the kiosk
 *   name - "First L." for display, or the full name if two people would
 *          otherwise share the same display name
 */
function readRoster_() {
  const values = getSheet_(SHEET.ROSTER).getDataRange().getValues();
  if (values.length < 2) return [];

  const header = values[0].map((h) => String(h).toLowerCase().replace(/[^a-z]/g, ''));
  const col = (...keys) => header.findIndex((h) => keys.includes(h));
  const firstCol = col('firstname', 'first');
  const lastCol = col('lastname', 'last');
  const subteamCol = col('subteam', 'team');
  const activeCol = col('active');
  if (firstCol < 0 || lastCol < 0) {
    throw new Error('Roster tab needs "First Name" and "Last Name" header columns.');
  }

  const people = values
    .slice(1)
    .map((r) => ({
      first: String(r[firstCol]).trim(),
      last: String(r[lastCol]).trim(),
      subteam: subteamCol < 0 ? '' : String(r[subteamCol]).trim(),
      active: activeCol < 0 ? true : isActive_(r[activeCol]),
    }))
    .filter((p) => p.first && p.active);

  const shortCounts = {};
  people.forEach((p) => {
    p.id = p.last ? p.first + ' ' + p.last : p.first;
    p.short = p.last ? p.first + ' ' + p.last[0] + '.' : p.first;
    shortCounts[p.short] = (shortCounts[p.short] || 0) + 1;
  });
  people.forEach((p) => {
    p.name = shortCounts[p.short] > 1 ? p.id : p.short;
  });
  return people;
}

/**
 * todayMs is the total of today's finished sessions, in milliseconds. It does
 * not include the open session; the kiosk adds that from `since`.
 */
function studentState_(person, openSession, todayMs) {
  return {
    id: person.id,
    name: person.name,
    subteam: person.subteam,
    checkedIn: !!openSession,
    since: openSession ? openSession.inTime.toISOString() : null,
    todayMs: todayMs || 0,
  };
}

/** Blank or any yes-like value counts as active, so mentors can just type names. */
function isActive_(v) {
  if (v === '' || v === true) return true;
  return /^(y|yes|true|1|x)$/i.test(String(v).trim());
}

/** Checks a student in or out by id ("First Last"). Returns their new state. */
function toggle_(id, source) {
  id = id.trim();
  const person = readRoster_().find((p) => p.id === id);
  if (!person) throw new ClientError_('unknown student');

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const now = new Date();
    const state = readSessions_();
    const open = state.open[id];
    const todayMs = state.todayMs[id] || 0;

    // Ignore a second tap that arrives right after the first.
    const last = lastPunchTime_(id);
    if (last && now - last < DOUBLE_TAP_MS) {
      return studentState_(person, open, todayMs);
    }

    const sessions = getSheet_(SHEET.SESSIONS);
    if (open) {
      const hours = Math.round(((now - open.inTime) / 36e5) * 100) / 100;
      sessions.getRange(open.row, SESSION_COL.OUT, 1, 2).setValues([[now, hours]]);
      appendPunch_(now, id, 'OUT', source);
      const closedToday = dayKey_(open.inTime) === dayKey_(now) ? now - open.inTime : 0;
      return studentState_(person, null, todayMs + closedToday);
    }

    sessions.appendRow([id, dayKey_(now), now, '', '', '']);
    appendPunch_(now, id, 'IN', source);
    return studentState_(person, { inTime: now }, todayMs);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Applies a batch of kiosk taps in one locked pass: reads Sessions once and
 * writes all new rows together. Each item says the state the student should
 * end up in ({ id, checkedIn, at }), so sending the same item twice is
 * harmless. If an id appears more than once, the last item wins.
 * Returns each student's new state, or { id, error } for a bad item.
 */
function setMany_(items, source) {
  if (!Array.isArray(items) || !items.length) throw new ClientError_('bad request');
  if (items.length > MAX_BATCH) throw new ClientError_('too many items');

  const latest = new Map();
  items.forEach((it) => latest.set(String((it && it.id) || '').trim(), it));
  const byId = {};
  readRoster_().forEach((p) => { byId[p.id] = p; });

  return withLock_(() => {
    const now = new Date();
    const { open, todayMs } = readSessions_();
    const sessions = getSheet_(SHEET.SESSIONS);
    const newSessions = [];
    const punches = [];
    const results = [];

    latest.forEach((it, id) => {
      const person = byId[id];
      if (!person) { results.push({ id, error: 'unknown student' }); return; }
      const at = tapTime_(it.at, now);
      const session = open[id];

      if (it.checkedIn && !session) {
        newSessions.push([id, dayKey_(at), at, '', '', '']);
        punches.push([at, id, 'IN', source]);
        open[id] = { row: null, inTime: at };
      } else if (!it.checkedIn && session) {
        const out = at < session.inTime ? now : at;
        const hours = Math.round(((out - session.inTime) / 36e5) * 100) / 100;
        sessions.getRange(session.row, SESSION_COL.OUT, 1, 2).setValues([[out, hours]]);
        punches.push([out, id, 'OUT', source]);
        if (dayKey_(session.inTime) === dayKey_(now)) todayMs[id] = (todayMs[id] || 0) + (out - session.inTime);
        delete open[id];
      }
      results.push(studentState_(person, open[id], todayMs[id]));
    });

    appendRows_(sessions, newSessions);
    appendRows_(getSheet_(SHEET.PUNCHES), punches);
    return results;
  });
}

/** The kiosk's tap time if it's believable, otherwise server time. */
function tapTime_(iso, now) {
  const t = new Date(iso);
  if (isNaN(t)) return now;
  const age = now - t;
  return age >= -MAX_TAP_SKEW_MS && age <= MAX_TAP_AGE_MS ? new Date(Math.min(t, now)) : now;
}

function appendRows_(sheet, rows) {
  if (!rows.length) return;
  sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
}

/**
 * One pass over Sessions:
 *   open    - name -> { row, inTime } for today's sessions with no Out time
 *   todayMs - name -> total ms of finished sessions that started today
 * Durations use Out - In, so a mentor fixing a row only needs to set Out.
 * An open session from an earlier day counts as closed: autoCheckout() will
 * close it at that day's midnight, and nobody shows as "here" in the meantime.
 */
function readSessions_() {
  const open = {};
  const todayMs = {};
  const today = dayKey_(new Date());
  readRows_(SHEET.SESSIONS).forEach((r, i) => {
    const name = String(r[SESSION_COL.NAME - 1]).trim();
    const inTime = r[SESSION_COL.IN - 1];
    const outTime = r[SESSION_COL.OUT - 1];
    if (!name || !inTime) return;
    const inDate = new Date(inTime);
    if (!outTime) {
      if (dayKey_(inDate) === today) open[name] = { row: i + 2, inTime: inDate };
    } else if (dayKey_(inDate) === today) {
      const ms = new Date(outTime) - inDate;
      if (ms > 0) todayMs[name] = (todayMs[name] || 0) + ms;
    }
  });
  return { open, todayMs };
}

/** Calendar day in the script's time zone, e.g. "2026-11-06". */
function dayKey_(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd');
}

/** Midnight at the end of the day `date` falls on, in the script's time zone. */
function endOfDay_(date) {
  const next = new Date(Date.parse(dayKey_(date) + 'T00:00:00Z') + 864e5).toISOString().slice(0, 10);
  const tz = Session.getScriptTimeZone();
  // Use the UTC offset in effect at that midnight (it differs on daylight-saving days).
  let guess = new Date(next + 'T00:00:00' + Utilities.formatDate(date, tz, 'XXX'));
  guess = new Date(next + 'T00:00:00' + Utilities.formatDate(guess, tz, 'XXX'));
  return guess;
}

// ---------------------------------------------------------------------------
// Nightly automatic checkout
// ---------------------------------------------------------------------------

/**
 * Closes every session still open from an earlier day, with check-out at
 * midnight at the end of the day it started. The row is marked Auto Closed so
 * a mentor can review it on the admin page. Run by a daily trigger shortly
 * after midnight (see installAutoCheckout); safe to run by hand any time.
 */
function autoCheckout() {
  return withLock_(() => {
    const today = dayKey_(new Date());
    const sheet = getSheet_(SHEET.SESSIONS);
    const punches = [];
    readRows_(SHEET.SESSIONS).forEach((r, i) => {
      const name = String(r[SESSION_COL.NAME - 1]).trim();
      const inTime = r[SESSION_COL.IN - 1];
      if (!name || !inTime || r[SESSION_COL.OUT - 1]) return;
      const inDate = new Date(inTime);
      if (dayKey_(inDate) >= today) return;
      const out = endOfDay_(inDate);
      const hours = Math.round(((out - inDate) / 36e5) * 100) / 100;
      sheet.getRange(i + 2, SESSION_COL.OUT, 1, 3).setValues([[out, hours, 'yes']]);
      punches.push([out, name, 'OUT', 'auto']);
    });
    appendRows_(getSheet_(SHEET.PUNCHES), punches);
    console.log('autoCheckout closed ' + punches.length + ' session(s)');
    return punches.length;
  });
}

/** Creates the daily trigger for autoCheckout (replacing any old one). Run once from the editor. */
function installAutoCheckout() {
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === 'autoCheckout')
    .forEach((t) => ScriptApp.deleteTrigger(t));
  // Google runs it at a random minute between 12:00 and 1:00 a.m.
  ScriptApp.newTrigger('autoCheckout').timeBased().everyDays(1).atHour(0).create();
  Logger.log('Installed: autoCheckout runs every night between 12 and 1 a.m.');
}

function lastPunchTime_(name) {
  const sh = getSheet_(SHEET.PUNCHES);
  const lastRow = sh.getLastRow();
  if (lastRow < 2) return null;
  const start = Math.max(2, lastRow - RECENT_PUNCH_ROWS + 1);
  const rows = sh.getRange(start, 1, lastRow - start + 1, 2).getValues();
  for (let i = rows.length - 1; i >= 0; i--) {
    if (String(rows[i][1]).trim() === name) return new Date(rows[i][0]);
  }
  return null;
}

function appendPunch_(time, name, action, source) {
  getSheet_(SHEET.PUNCHES).appendRow([time, name, action, source]);
}

// ---------------------------------------------------------------------------
// GitHub Projects (read-only, using the GITHUB_TOKEN script property)
// ---------------------------------------------------------------------------

const GITHUB_ORG = 'FRC1756-Argos';
// Shown on the board in this order. `label` is the panel title.
const GITHUB_BOARD_PROJECTS = [
  { number: 10, label: 'Mechanical' },
  { number: 12, label: 'Software' },
];
const GITHUB_PROJECTS = GITHUB_BOARD_PROJECTS.map((p) => p.number);
const GITHUB_MAX_ITEMS = 500; // per project
const GITHUB_STATUS_FIELD = 'Status';
const GITHUB_CACHE_KEY = 'githubTasks';
const GITHUB_CACHE_SECONDS = 6 * 60 * 60; // the most CacheService allows
const GITHUB_REFRESH_MINUTES = 5;

const PROJECT_QUERY = `
query($org: String!, $number: Int!, $cursor: String) {
  organization(login: $org) {
    projectV2(number: $number) {
      title
      url
      fields(first: 50) {
        nodes {
          ... on ProjectV2SingleSelectField { name dataType options { name } }
          ... on ProjectV2Field { name dataType }
          ... on ProjectV2IterationField { name dataType }
        }
      }
      items(first: 100, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        nodes {
          id
          isArchived
          type
          fieldValues(first: 30) {
            nodes {
              ... on ProjectV2ItemFieldSingleSelectValue { name field { ... on ProjectV2FieldCommon { name } } }
              ... on ProjectV2ItemFieldDateValue { date field { ... on ProjectV2FieldCommon { name } } }
              ... on ProjectV2ItemFieldIterationValue { title startDate duration field { ... on ProjectV2FieldCommon { name } } }
            }
          }
          content {
            ... on DraftIssue { title assignees(first: 5) { nodes { login name } } }
            ... on Issue { title number url state repository { name } assignees(first: 5) { nodes { login name } } }
            ... on PullRequest { title number url state repository { name } assignees(first: 5) { nodes { login name } } }
          }
        }
      }
    }
  }
}`;

/** One GraphQL call to GitHub. Throws with GitHub's message if it fails. */
function githubGraphql_(query, variables) {
  const token = PropertiesService.getScriptProperties().getProperty('GITHUB_TOKEN');
  if (!token) throw new Error('Set the GITHUB_TOKEN script property.');
  const res = UrlFetchApp.fetch('https://api.github.com/graphql', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + token },
    payload: JSON.stringify({ query, variables }),
    muteHttpExceptions: true,
  });
  const code = res.getResponseCode();
  const body = JSON.parse(res.getContentText() || '{}');
  if (code !== 200) throw new Error('GitHub returned ' + code + ': ' + (body.message || res.getContentText()));
  if (body.errors && !body.data) throw new Error('GitHub: ' + body.errors.map((e) => e.message).join('; '));
  return body;
}

/**
 * Reads one org project: its fields, and every non-archived item with its
 * single-select values (like Status), date values, and title/assignees.
 * Items in repos the token can't read come back with title "(no access)".
 */
function fetchProject_(number) {
  let project = null;
  const items = [];
  let cursor = null;
  const warnings = [];
  do {
    const body = githubGraphql_(PROJECT_QUERY, { org: GITHUB_ORG, number, cursor });
    if (body.errors) body.errors.forEach((e) => warnings.push(e.message));
    const p = body.data && body.data.organization && body.data.organization.projectV2;
    if (!p) throw new Error('Project ' + number + ' not found, or the token can\'t read it.');
    if (!project) {
      project = {
        number,
        title: p.title,
        url: p.url,
        fields: p.fields.nodes.filter((f) => f && f.name).map((f) => ({
          name: f.name,
          type: f.dataType,
          options: f.options ? f.options.map((o) => o.name) : undefined,
        })),
      };
    }
    p.items.nodes.forEach((n) => {
      if (!n || n.isArchived) return;
      const values = {};
      (n.fieldValues.nodes || []).forEach((v) => {
        if (!v || !v.field || !v.field.name) return;
        values[v.field.name] = v.name !== undefined ? v.name : v.date !== undefined ? v.date : v.title;
      });
      const c = n.content || {};
      items.push({
        id: n.id,
        type: n.type,
        title: c.title || '(no access)',
        number: c.number || null,
        repo: c.repository ? c.repository.name : '',
        url: c.url || '',
        state: c.state || '',
        assignees: c.assignees ? c.assignees.nodes.map((a) => a.name || a.login) : [],
        values,
      });
    });
    cursor = p.items.pageInfo.hasNextPage ? p.items.pageInfo.endCursor : null;
  } while (cursor && items.length < GITHUB_MAX_ITEMS);
  project.items = items;
  project.warnings = [...new Set(warnings)];
  return project;
}

/**
 * What a status means on the board, from its name (emoji and case ignored):
 *   active  - in progress          review - in review
 *   help    - needs help / on hold / blocked
 *   ready   - ready                closed - done / rescinded (not shown)
 *   backlog - anything else (new, backlog, no status)
 */
function statusKind_(name) {
  const s = String(name || '').toLowerCase().replace(/[^a-z /]/g, '').trim();
  if (!s) return 'backlog';
  if (/done|rescind|closed|complete|wont/.test(s)) return 'closed';
  if (/help|hold|block/.test(s)) return 'help';
  if (/review/.test(s)) return 'review';
  if (/progress|doing/.test(s)) return 'active';
  if (/ready/.test(s)) return 'ready';
  return 'backlog';
}

/** A status name without its leading emoji, e.g. "🏗 In progress" -> "In progress". */
function cleanStatus_(name) {
  return String(name || '').replace(/^[^A-Za-z0-9]+/, '').trim() || String(name || '');
}

/**
 * Fetches every board project from GitHub and saves a compact copy in the
 * script cache: open items grouped into one column per status, in the
 * project's status order. Done/rescinded items are only counted. Run every
 * few minutes by a trigger (see installGitHubSync), so the board never waits
 * on GitHub. If GitHub fails, the last good copy is kept and marked stale.
 */
function refreshTasks() {
  const cache = CacheService.getScriptCache();
  try {
    const projects = GITHUB_BOARD_PROJECTS.map((cfg) => {
      const p = fetchProject_(cfg.number);
      const field = p.fields.find((f) => f.name === GITHUB_STATUS_FIELD && f.options);
      const statusNames = field ? field.options : [];
      const columns = [];
      const byStatus = {};
      const addColumn = (raw) => {
        const col = { name: cleanStatus_(raw) || 'No status', label: raw || 'No status', kind: statusKind_(raw), items: [] };
        byStatus[raw] = col;
        columns.push(col);
        return col;
      };
      statusNames.forEach(addColumn);
      let doneCount = 0;
      p.items.forEach((it) => {
        const raw = it.values[GITHUB_STATUS_FIELD] || '';
        if (statusKind_(raw) === 'closed') { doneCount++; return; }
        const col = byStatus[raw] || addColumn(raw);
        col.items.push({
          id: it.id,
          title: it.title,
          ref: it.number ? '#' + it.number + (it.repo ? ' · ' + it.repo : '') : 'draft',
          assignees: it.assignees,
          url: it.url || p.url,
        });
      });
      // "No status" first, like GitHub's board view.
      columns.sort((a, b) => (a.label === 'No status' ? -1 : b.label === 'No status' ? 1 : 0));
      return {
        number: cfg.number,
        label: cfg.label,
        url: p.url,
        doneCount,
        columns: columns.filter((c) => c.kind !== 'closed'),
      };
    });
    const tasks = { updatedAt: new Date().toISOString(), projects };
    cache.put(GITHUB_CACHE_KEY, JSON.stringify(tasks), GITHUB_CACHE_SECONDS);
    console.log('refreshTasks: saved ' + projects.map((p) => p.label + ' ' +
      p.columns.reduce((n, c) => n + c.items.length, 0) + ' open').join(', '));
    return tasks;
  } catch (err) {
    // Keep showing the last good copy, marked with the error.
    const old = cache.get(GITHUB_CACHE_KEY);
    if (old) {
      const tasks = JSON.parse(old);
      tasks.error = String(err.message || err);
      cache.put(GITHUB_CACHE_KEY, JSON.stringify(tasks), GITHUB_CACHE_SECONDS);
    }
    throw err;
  }
}

/** The saved GitHub tasks for the board, or null if there are none yet. */
function getCachedTasks_() {
  const raw = CacheService.getScriptCache().get(GITHUB_CACHE_KEY);
  return raw ? JSON.parse(raw) : null;
}

// ---- Board-only priority order --------------------------------------------
// Tasks can be dragged into priority order on the board. The order is kept
// here (Script Property TASK_ORDER = { projectNumber: [item ids, highest
// first] }), not in GitHub. Items without a saved place keep GitHub's order,
// after the ones that have one.

const TASK_ORDER_PROP = 'TASK_ORDER';
const MAX_REORDER_IDS = 200;

function getTaskOrder_() {
  try {
    return JSON.parse(PropertiesService.getScriptProperties().getProperty(TASK_ORDER_PROP) || '{}') || {};
  } catch (e) {
    return {};
  }
}

/** Sorts each column's items by the saved order. Returns the same object. */
function applyTaskOrder_(tasks) {
  if (!tasks) return tasks;
  const order = getTaskOrder_();
  tasks.projects.forEach((p) => {
    const rank = {};
    (order[p.number] || []).forEach((id, i) => { rank[id] = i; });
    p.columns.forEach((c) => {
      c.items = c.items
        .map((t, i) => ({ t, i }))
        .sort((a, b) => ((rank[a.t.id] ?? Infinity) - (rank[b.t.id] ?? Infinity)) || a.i - b.i)
        .map((x) => x.t);
    });
  });
  return tasks;
}

/**
 * Saves a new order after a drag. `ids` is one column's items, top first;
 * they move ahead of everything else in that project's saved order. Ids that
 * are no longer open tasks are dropped so the saved list stays small.
 */
function reorderTasks_(project, ids) {
  const number = Number(project);
  if (!GITHUB_PROJECTS.includes(number)) throw new ClientError_('unknown project');
  if (!Array.isArray(ids) || !ids.length || ids.length > MAX_REORDER_IDS) throw new ClientError_('bad request');
  ids = ids.map(String).filter((id) => /^[A-Za-z0-9_-]{1,100}$/.test(id));

  return withLock_(() => {
    const order = getTaskOrder_();
    const rest = (order[number] || []).filter((id) => !ids.includes(id));
    let list = ids.concat(rest);
    const tasks = getCachedTasks_();
    const p = tasks && tasks.projects.find((x) => x.number === number);
    if (p) {
      const open = new Set(p.columns.flatMap((c) => c.items.map((t) => t.id)));
      list = list.filter((id) => open.has(id));
    }
    order[number] = list;
    PropertiesService.getScriptProperties().setProperty(TASK_ORDER_PROP, JSON.stringify(order));
    return applyTaskOrder_(tasks);
  });
}

/** Creates the trigger that refreshes GitHub tasks every few minutes, and runs it once. */
function installGitHubSync() {
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === 'refreshTasks')
    .forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('refreshTasks').timeBased().everyMinutes(GITHUB_REFRESH_MINUTES).create();
  Logger.log('Installed: refreshTasks runs every ' + GITHUB_REFRESH_MINUTES + ' minutes.');
  refreshTasks();
}

/**
 * Run from the editor to check the GitHub token and see each project's
 * fields, status options, and how many items are in each status.
 */
function checkGitHub() {
  GITHUB_PROJECTS.forEach((number) => {
    const p = fetchProject_(number);
    const lines = ['Project ' + number + ': "' + p.title + '"  ' + p.url, '  ' + p.items.length + ' items'];
    p.fields.forEach((f) => {
      if (f.options) {
        const counts = f.options.map((o) => o + ' (' + p.items.filter((i) => i.values[f.name] === o).length + ')');
        const none = p.items.filter((i) => !i.values[f.name]).length;
        lines.push('  ' + f.name + ' [single select]: ' + counts.join(', ') + (none ? ', not set (' + none + ')' : ''));
      } else if (f.type === 'DATE' || f.type === 'ITERATION') {
        lines.push('  ' + f.name + ' [' + f.type.toLowerCase() + ']');
      }
    });
    const noAccess = p.items.filter((i) => i.title === '(no access)').length;
    if (noAccess) lines.push('  ' + noAccess + ' item(s) the token can\'t read (private repo without Issues/PR access)');
    if (p.warnings.length) lines.push('  GitHub warnings: ' + p.warnings.join('; '));
    Logger.log(lines.join('\n'));
  });
}

// ---------------------------------------------------------------------------
// Big board
// ---------------------------------------------------------------------------

/**
 * Everything the TV board shows:
 *   here          - checked-in students (name, subteam, since, todayMs)
 *   rosterCount   - number of active students
 *   announcements - [{ text }] showing today
 *   deadlines     - [{ title, date, category, daysLeft }] in the next DEADLINE_WINDOW_DAYS
 *   tasks         - saved GitHub tasks (see refreshTasks), or null
 */
function getBoard_() {
  const roster = getRoster_();
  return {
    here: roster.filter((s) => s.checkedIn),
    rosterCount: roster.length,
    announcements: getAnnouncements_(),
    deadlines: getDeadlines_(),
    tasks: applyTaskOrder_(getCachedTasks_()),
  };
}

/** Rows with Text, shown when today is between Show From and Show Until (blank = no limit). */
function getAnnouncements_() {
  const today = dayKey_(new Date());
  return readTable_(SHEET.ANNOUNCEMENTS)
    .filter((r) => String(r.text || '').trim())
    .filter((r) => {
      const from = toDayKey_(r.showfrom);
      const until = toDayKey_(r.showuntil);
      return (!from || from <= today) && (!until || until >= today);
    })
    .map((r) => ({ text: String(r.text).trim() }));
}

/** Deadlines from today through DEADLINE_WINDOW_DAYS ahead, soonest first. */
function getDeadlines_() {
  const today = dayKey_(new Date());
  return readTable_(SHEET.DEADLINES)
    .map((r) => ({
      title: String(r.title || '').trim(),
      date: toDayKey_(r.date),
      category: String(r.category || '').trim(),
    }))
    .filter((d) => d.title && d.date)
    .map((d) => ({ ...d, daysLeft: daysBetween_(today, d.date) }))
    .filter((d) => d.daysLeft >= 0 && d.daysLeft <= DEADLINE_WINDOW_DAYS)
    .sort((a, b) => a.daysLeft - b.daysLeft);
}

/** "yyyy-MM-dd" for a date cell or date-like text, or '' if blank or not a date. */
function toDayKey_(v) {
  if (v === '' || v === null || v === undefined) return '';
  const d = v instanceof Date ? v : new Date(v);
  return isNaN(d) ? '' : dayKey_(d);
}

/** Whole days from one "yyyy-MM-dd" to another. */
function daysBetween_(fromKey, toKey) {
  const ms = Date.parse(toKey + 'T00:00:00Z') - Date.parse(fromKey + 'T00:00:00Z');
  return Math.round(ms / 864e5);
}

// ---------------------------------------------------------------------------
// Admin: edit announcements and deadlines
// ---------------------------------------------------------------------------

const ADMIN_ACTIONS = {
  'announcement.add': (b) => {
    appendFields_(openTable_(SHEET.ANNOUNCEMENTS), { text: cleanText_(b.text, MAX_ANNOUNCEMENT, 'Text') });
  },
  'announcement.update': (b) => {
    const t = openTable_(SHEET.ANNOUNCEMENTS);
    writeFields_(t, findRow_(t, b.id), { text: cleanText_(b.text, MAX_ANNOUNCEMENT, 'Text') });
  },
  'announcement.delete': (b) => {
    const t = openTable_(SHEET.ANNOUNCEMENTS);
    t.sheet.deleteRow(findRow_(t, b.id));
  },
  'deadline.add': (b) => {
    appendFields_(openTable_(SHEET.DEADLINES), deadlineFields_(b));
  },
  'deadline.update': (b) => {
    const t = openTable_(SHEET.DEADLINES);
    writeFields_(t, findRow_(t, b.id), deadlineFields_(b));
  },
  'deadline.delete': (b) => {
    const t = openTable_(SHEET.DEADLINES);
    t.sheet.deleteRow(findRow_(t, b.id));
  },

  // Sessions are found by sheet row. Every edit also sends the row's original
  // name and check-in time (origIn), and is refused if the row no longer
  // matches, so an edit can't land on the wrong row.
  'session.add': (b) => {
    const id = String(b.id || '').trim();
    if (!readRoster_().some((p) => p.id === id)) throw new ClientError_('Pick a student');
    const { inTime, outTime } = sessionTimes_(b);
    if (!outTime) requireNoOtherOpen_(id, null);
    getSheet_(SHEET.SESSIONS).appendRow(sessionRow_(id, inTime, outTime));
    return getSessionsForDay_(viewDay_(b, inTime));
  },
  'session.update': (b) => {
    const row = checkSessionRow_(b);
    const { inTime, outTime } = sessionTimes_(b);
    if (!outTime) requireNoOtherOpen_(b.id, row);
    getSheet_(SHEET.SESSIONS).getRange(row, 1, 1, 6).setValues([sessionRow_(String(b.id), inTime, outTime)]);
    return getSessionsForDay_(viewDay_(b, inTime));
  },
  'session.delete': (b) => {
    const row = checkSessionRow_(b);
    getSheet_(SHEET.SESSIONS).deleteRow(row);
    return getSessionsForDay_(viewDay_(b, new Date(b.origIn)));
  },

  'settings.update': (b) => {
    const start = String(b.seasonStart || '');
    if (start && !/^\d{4}-\d{2}-\d{2}$/.test(start)) throw new ClientError_('Season start is not a valid date');
    const goal = Number(b.weeklyGoal);
    if (!(goal > 0 && goal <= 80)) throw new ClientError_('Weekly goal must be between 0 and 80 hours');
    PropertiesService.getScriptProperties().setProperties({ SEASON_START: start, WEEKLY_GOAL: String(goal) });
    return getHours_();
  },

  // Override one week's goal (for example, a meeting canceled for weather).
  // A blank goal goes back to the default weekly goal.
  'weekGoal.set': (b) => {
    const week = Number(b.week);
    if (!Number.isInteger(week) || week < 1 || week > 60) throw new ClientError_('bad week');
    const goals = getSettings_().weekGoals;
    if (b.goal === '' || b.goal === null || b.goal === undefined) {
      delete goals[week];
    } else {
      const g = Number(b.goal);
      if (!(g >= 0 && g <= 80)) throw new ClientError_('Week goal must be between 0 and 80 hours');
      goals[week] = g;
    }
    PropertiesService.getScriptProperties().setProperty('WEEK_GOALS', JSON.stringify(goals));
    return getHours_();
  },
};

const ADMIN_VIEWS = {
  admin: () => getAdminData_(),
  sessions: (p) => getSessionsForDay_(cleanDayKey_(p.date)),
  sessionDays: (p) => ({ days: getSessionDays_(p.month) }),
  hours: () => getHours_(),
};

// ---------------------------------------------------------------------------
// Admin: season hours
// ---------------------------------------------------------------------------

const DEFAULT_WEEKLY_GOAL = 9;

/**
 * Season settings from Script Properties (set on the hours page):
 *   seasonStart - "yyyy-MM-dd", the first day of week 1
 *   weeklyGoal  - default hours per week
 *   weekGoals   - { week number: hours } overrides for individual weeks
 */
function getSettings_() {
  const props = PropertiesService.getScriptProperties();
  const goal = Number(props.getProperty('WEEKLY_GOAL'));
  let weekGoals = {};
  try { weekGoals = JSON.parse(props.getProperty('WEEK_GOALS') || '{}') || {}; } catch (e) { weekGoals = {}; }
  return {
    seasonStart: props.getProperty('SEASON_START') || '',
    weeklyGoal: goal > 0 ? goal : DEFAULT_WEEKLY_GOAL,
    weekGoals,
  };
}

/**
 * Hours per student per meeting day, from the season start through today.
 * A meeting day is any day with at least one check-in. Hours count toward the
 * day the session started. Today's open sessions count up to now; open
 * sessions from earlier days are skipped until autoCheckout closes them.
 * Every active student is listed, even with no hours; students no longer on
 * the roster are listed (active: false) if they have hours this season.
 *
 * Returns { settings, today, meetingDays: [day], students: [{ id, name,
 * subteam, active, days: { day: hours }, autoDays: [day] }] }.
 * The page groups days into weeks: week 1 is the 7 days starting on
 * settings.seasonStart.
 */
function getHours_() {
  const settings = getSettings_();
  const now = new Date();
  const today = dayKey_(now);
  const byId = {};
  readRoster_().forEach((p) => {
    byId[p.id] = { id: p.id, name: p.name, subteam: p.subteam, active: true, days: {}, autoDays: [] };
  });
  const meetingDays = new Set();

  if (settings.seasonStart) {
    readRows_(SHEET.SESSIONS).forEach((r) => {
      const id = String(r[SESSION_COL.NAME - 1]).trim();
      const inTime = r[SESSION_COL.IN - 1];
      if (!id || !inTime) return;
      const inDate = new Date(inTime);
      const day = dayKey_(inDate);
      if (day < settings.seasonStart || day > today) return;
      const outTime = r[SESSION_COL.OUT - 1];
      const end = outTime ? new Date(outTime) : day === today ? now : null;
      if (!end || end <= inDate) return;
      meetingDays.add(day);
      const s = byId[id] || (byId[id] = { id, name: id, subteam: '', active: false, days: {}, autoDays: [] });
      s.days[day] = (s.days[day] || 0) + (end - inDate) / 36e5;
      if (r[SESSION_COL.AUTO - 1] && !s.autoDays.includes(day)) s.autoDays.push(day);
    });
  }

  const students = Object.values(byId).sort((a, b) => a.name.localeCompare(b.name));
  students.forEach((s) => {
    Object.keys(s.days).forEach((d) => { s.days[d] = Math.round(s.days[d] * 100) / 100; });
  });
  return { settings, today, meetingDays: [...meetingDays].sort(), students };
}

// ---------------------------------------------------------------------------
// Admin: sessions
// ---------------------------------------------------------------------------

/**
 * Sessions that started on one day, earliest first, plus the active roster
 * (for adding a session). Names are the full "First Last" ids.
 */
function getSessionsForDay_(day) {
  const sessions = [];
  readRows_(SHEET.SESSIONS).forEach((r, i) => {
    const id = String(r[SESSION_COL.NAME - 1]).trim();
    const inTime = r[SESSION_COL.IN - 1];
    const outTime = r[SESSION_COL.OUT - 1];
    if (!id || !inTime) return;
    const inDate = new Date(inTime);
    if (dayKey_(inDate) !== day) return;
    const outDate = outTime ? new Date(outTime) : null;
    sessions.push({
      row: i + 2,
      id,
      in: inDate.toISOString(),
      out: outDate ? outDate.toISOString() : null,
      hours: outDate ? Math.round(((outDate - inDate) / 36e5) * 100) / 100 : null,
      autoClosed: !!r[SESSION_COL.AUTO - 1],
    });
  });
  sessions.sort((a, b) => a.in.localeCompare(b.in) || a.id.localeCompare(b.id));
  const students = readRoster_().map((p) => ({ id: p.id })).sort((a, b) => a.id.localeCompare(b.id));
  return { date: day, sessions, students };
}

/** Number of sessions started on each day of a month ("yyyy-MM"). */
function getSessionDays_(month) {
  if (!/^\d{4}-\d{2}$/.test(String(month || ''))) throw new ClientError_('bad month');
  const days = {};
  readRows_(SHEET.SESSIONS).forEach((r) => {
    const inTime = r[SESSION_COL.IN - 1];
    if (!String(r[SESSION_COL.NAME - 1]).trim() || !inTime) return;
    const day = dayKey_(new Date(inTime));
    if (day.slice(0, 7) === month) days[day] = (days[day] || 0) + 1;
  });
  return days;
}

/** In and optional out time from an admin request; out must be after in. */
function sessionTimes_(b) {
  const inTime = cleanTime_(b.in, 'Check-in time');
  const outTime = b.out ? cleanTime_(b.out, 'Check-out time') : null;
  if (outTime && outTime <= inTime) throw new ClientError_('Check-out must be after check-in');
  if (inTime > new Date()) throw new ClientError_('Check-in can\'t be in the future');
  if (!outTime && dayKey_(inTime) !== dayKey_(new Date())) {
    throw new ClientError_('Sessions on earlier days need a check-out time');
  }
  return { inTime, outTime };
}

/** One Sessions row. An admin edit clears the Auto Closed flag. */
function sessionRow_(id, inTime, outTime) {
  const hours = outTime ? Math.round(((outTime - inTime) / 36e5) * 100) / 100 : '';
  return [id, dayKey_(inTime), inTime, outTime || '', hours, ''];
}

/** Returns the row if it still holds the session the admin page loaded. */
function checkSessionRow_(b) {
  const row = Number(b.row);
  const sheet = getSheet_(SHEET.SESSIONS);
  if (!Number.isInteger(row) || row < 2 || row > sheet.getLastRow()) throw new ClientError_(SESSION_CHANGED);
  const [name, , inTime] = sheet.getRange(row, 1, 1, 3).getValues()[0];
  const same = String(name).trim() === String(b.id || '') && inTime && new Date(inTime).getTime() === new Date(b.origIn).getTime();
  if (!same) throw new ClientError_(SESSION_CHANGED);
  return row;
}
const SESSION_CHANGED = 'This session changed since the page loaded it. Pick the day again to reload.';

/** A student can have only one open session (no check-out time) at a time. */
function requireNoOtherOpen_(id, row) {
  const open = readSessions_().open[String(id)];
  if (open && open.row !== row) {
    throw new ClientError_(id + ' is already checked in (' + dayKey_(open.inTime) + '). Give this session a check-out time.');
  }
}

function cleanTime_(v, label) {
  const d = new Date(v);
  if (!v || isNaN(d)) throw new ClientError_(label + ' is required');
  return d;
}

function cleanDayKey_(v) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(v || ''))) throw new ClientError_('bad date');
  return String(v);
}

/** The day the admin page is showing, so it gets that day's list back. */
function viewDay_(b, fallback) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(b.day || '')) ? b.day : dayKey_(fallback);
}

/** Every announcement and deadline (not just the ones the board shows), with ids. */
function getAdminData_() {
  return {
    announcements: openTable_(SHEET.ANNOUNCEMENTS).rows
      .filter((r) => String(r.fields.text || '').trim())
      .map((r) => ({
        id: r.fields.id,
        text: String(r.fields.text).trim(),
        showFrom: toDayKey_(r.fields.showfrom),
        showUntil: toDayKey_(r.fields.showuntil),
      })),
    deadlines: openTable_(SHEET.DEADLINES).rows
      .filter((r) => String(r.fields.title || '').trim())
      .map((r) => ({
        id: r.fields.id,
        title: String(r.fields.title).trim(),
        date: toDayKey_(r.fields.date),
        category: String(r.fields.category || '').trim(),
      })),
  };
}

function deadlineFields_(b) {
  const category = String(b.category || '').trim();
  if (category.length > MAX_CATEGORY) throw new ClientError_('Category is too long');
  return {
    title: cleanText_(b.title, MAX_TITLE, 'Title'),
    date: cleanDate_(b.date),
    category,
  };
}

function cleanText_(v, max, label) {
  const s = String(v || '').trim();
  if (!s) throw new ClientError_(label + ' is required');
  if (s.length > max) throw new ClientError_(label + ' is too long (max ' + max + ' characters)');
  return s;
}

/** "yyyy-MM-dd" -> Date at noon in the script's time zone (noon avoids off-by-one days). */
function cleanDate_(v) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(v || ''));
  if (!m) throw new ClientError_('Date is required');
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12);
  if (isNaN(d)) throw new ClientError_('Date is not valid');
  return d;
}

function withLock_(fn) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    return fn();
  } finally {
    lock.releaseLock();
  }
}

// ---------------------------------------------------------------------------
// Sheet helpers
// ---------------------------------------------------------------------------

function normKey_(h) {
  return String(h).toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Opens a tab for editing by id. Adds an "ID" column if the tab has none, and
 * gives an id to any row typed into the Sheet by hand. Blank rows are skipped.
 * Returns { sheet, keys, rows: [{ row, fields }] }; row is the 1-based sheet row.
 */
function openTable_(name) {
  const sheet = getSheet_(name);
  const width = Math.max(sheet.getLastColumn(), 1);
  const keys = sheet.getRange(1, 1, 1, width).getValues()[0].map(normKey_);
  let idCol = keys.indexOf('id');
  if (idCol < 0) {
    idCol = keys.length;
    keys.push('id');
    sheet.getRange(1, idCol + 1).setValue('ID').setFontWeight('bold');
  }
  const lastRow = sheet.getLastRow();
  const values = lastRow < 2 ? [] : sheet.getRange(2, 1, lastRow - 1, keys.length).getValues();
  const rows = [];
  values.forEach((v, i) => {
    if (v.every((c) => c === '')) return;
    const fields = {};
    keys.forEach((k, j) => { if (k) fields[k] = v[j]; });
    if (!fields.id) {
      fields.id = Utilities.getUuid().slice(0, 8);
      sheet.getRange(i + 2, idCol + 1).setValue(fields.id);
    }
    fields.id = String(fields.id);
    rows.push({ row: i + 2, fields });
  });
  return { sheet, keys, rows };
}

function findRow_(table, id) {
  const r = table.rows.find((x) => x.fields.id === String(id || ''));
  if (!r) throw new ClientError_('not found (it may have been deleted). Reload the page.');
  return r.row;
}

/** Sets the given fields (by header key) on one row. */
function writeFields_(table, row, fields) {
  Object.keys(fields).forEach((k) => {
    const col = table.keys.indexOf(k);
    if (col < 0) throw new Error('Missing column "' + k + '" on ' + table.sheet.getName() + '. Run setup().');
    table.sheet.getRange(row, col + 1).setValue(fields[k]);
  });
}

/** Adds a row with the given fields and a new id. */
function appendFields_(table, fields) {
  const all = { ...fields, id: Utilities.getUuid().slice(0, 8) };
  Object.keys(all).forEach((k) => {
    if (table.keys.indexOf(k) < 0) throw new Error('Missing column "' + k + '" on ' + table.sheet.getName() + '. Run setup().');
  });
  table.sheet.appendRow(table.keys.map((k) => (k in all ? all[k] : '')));
}

/**
 * Rows below the header as objects keyed by header text, lowercased with
 * spaces and punctuation removed ("Show From" -> "showfrom"). Column order
 * doesn't matter. Returns [] if the tab is missing, so an optional tab
 * doesn't break the board.
 */
function readTable_(name) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sh || sh.getLastRow() < 2) return [];
  const values = sh.getDataRange().getValues();
  const keys = values[0].map(normKey_);
  return values.slice(1).map((row) => {
    const obj = {};
    keys.forEach((k, i) => { if (k) obj[k] = row[i]; });
    return obj;
  });
}

function getSheet_(name) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sh) throw new Error('Missing sheet "' + name + '". Run setup() from the editor.');
  return sh;
}

/** All rows below the header. */
function readRows_(name) {
  const sh = getSheet_(name);
  const lastRow = sh.getLastRow();
  if (lastRow < 2) return [];
  return sh.getRange(2, 1, lastRow - 1, sh.getLastColumn()).getValues();
}

// ---------------------------------------------------------------------------
// Run these from the Apps Script editor
// ---------------------------------------------------------------------------

/** Creates any missing tabs and the nightly checkout trigger. Safe to run more than once. */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(HEADERS).forEach((name) => {
    const sh = ss.getSheetByName(name) || ss.insertSheet(name);
    if (sh.getLastRow() === 0) {
      const headers = HEADERS[name];
      sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
      sh.setFrozenRows(1);
    }
  });
  installAutoCheckout();
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty('GITHUB_TOKEN')) installGitHubSync();
  else Logger.log('Set GITHUB_TOKEN, then run setup again (or installGitHubSync) to show GitHub tasks.');
  ['PASSCODE', 'ADMIN_PASSCODE'].forEach((p) => {
    if (!props.getProperty(p)) Logger.log('Remember to set the ' + p + ' script property (Project Settings > Script Properties).');
  });
}

/** Toggles the first active student on the roster and logs the result. */
function testToggle() {
  const first = getRoster_()[0];
  if (!first) throw new Error('Add at least one name to the Roster tab first.');
  Logger.log(JSON.stringify(toggle_(first.id, 'manual')));
}
