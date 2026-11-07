# Big Board backend (Google Apps Script)

This is the backend for the Big Board and the check-in kiosk. It is a Google Apps Script web app attached to a Google Sheet. The Sheet holds the roster and every check-in and check-out.

The website pages are public HTML. Student data is protected here: every request must include the team passcode, or the script returns `{"ok": false, "error": "unauthorized"}` and nothing else.

## One-time setup

1. Create a Google Sheet named **Argos Big Board**, owned by a team or mentor account.
2. In the Sheet, open **Extensions > Apps Script**.
3. Replace the contents of `Code.gs` with [Code.gs](Code.gs) from this folder.
4. Open **Project Settings**:
   - Tick **Show "appsscript.json" manifest file in editor**, then replace the manifest's contents with [appsscript.json](appsscript.json).
   - Under **Script Properties**, add `PASSCODE` with the team passcode. Use at least 6 characters, because wrong guesses are only slowed down, not blocked.
   - Also add `ADMIN_PASSCODE`, a different code for mentors and captains. It unlocks the admin page (`/big-board/admin/`), where announcements and deadlines are edited. The team passcode can't open the admin page.
5. Back in the editor, choose `setup` from the function dropdown and click **Run**. Approve the permissions it asks for. This creates any missing tabs and installs the nightly automatic checkout (see below). If you set this up before automatic checkout existed, run `setup` again; the permissions prompt will also ask to manage triggers.
6. On the **Roster** tab, add students. The script finds columns by their header text, so the column order doesn't matter and other columns are ignored.
   - **First Name** and **Last Name** (required). The kiosk and board show `First L.`. If two students would show the same name, both are shown with their full names. Hours are recorded under the full name, `First Last`.
   - **Subteam** (optional): for example `Software` or `Mechanical`.
   - **Active** (optional): leave it blank or put `yes`. Put `no` to hide someone without deleting their history.

   Don't rename a student after they have hours recorded. Their past rows keep the old name.
7. Optional: choose `testToggle` and click **Run**. The first student should get a row in `Punches` and in `Sessions`. Run it again at least 5 seconds later to check them out, then delete those test rows.
8. Click **Deploy > New deployment**, choose the **Web app** type, set **Execute as: Me** and **Who has access: Anyone**, then click **Deploy**. Copy the `/exec` URL. The website pages will use it.

When you change `Code.gs` later, use **Deploy > Manage deployments > Edit > New version**. That keeps the same `/exec` URL.

## Tabs

| Tab | Who edits it | Columns |
|---|---|---|
| `Roster` | Mentors | First Name, Last Name, Subteam, Active (any order) |
| `Punches` | The script (append-only log) | Timestamp, Name (`First Last`), Action (`IN`/`OUT`), Source (`kiosk`/`manual`) |
| `Sessions` | The script. Mentors can fix mistakes here. | Name, Date, In, Out, Hours, Auto Closed |
| `Announcements` | The admin page, or mentors directly | Text, Show From, Show Until, ID |
| `Deadlines` | The admin page, or mentors directly | Title, Date, Category, ID |

The easiest way to edit these two tabs is the admin page at `/big-board/admin/`. You can still type rows straight into the Sheet; the admin page gives them an ID the next time it loads. The ID column is how the admin page finds a row, so don't edit or copy IDs by hand. If an older tab has no ID column, the admin page adds one.

**Announcements** appear on the board's "Today" card. Show From and Show Until are optional dates, and a blank means no limit. Rows with neither date stay up until you delete them. To show something for just one meeting, put that day's date in both columns.

**Deadlines** from today through 60 days ahead appear on the board, soonest first, up to 8 at a time. Category is optional, for example `Mechanical` or `Event`. Anything within 7 days is highlighted.

Both tabs find their columns by header text, like the Roster tab does.

A student counts as checked in when they have a `Sessions` row from today with an **In** time and a blank **Out**.

**Automatic checkout.** Every night between 12 and 1 a.m., `autoCheckout` closes any session still open from an earlier day. It sets **Out** to midnight at the end of the day the session started and puts `yes` in **Auto Closed**, so a mentor can review it. Sessions never span more than one day. Until the trigger runs, the board and kiosk already treat those sessions as closed, so a student who forgot never shows as "here" the next day. You can run `autoCheckout` by hand from the editor at any time. To check the trigger, open **Triggers** (the clock icon) in the editor.

**Fixing sessions.** On the admin page, click a day on the calendar to see every check-in that day. You can edit check-in and check-out times, add a session for someone who forgot to check in, or delete one. Auto-closed sessions are marked `AUTO`, and editing one clears the flag. A check-out time of 12:00 AM means midnight at the end of that day. You can also edit the `Sessions` tab directly; the board works from In and Out, so a fixed row only needs those two.

## GitHub tasks on the board

The board shows a **Software** panel (project 12) and a **Mechanical** panel (project 10) listing each project's **In progress** and **Ready** tasks. The ⤢ button on a panel opens that project full screen, with a column for every status (Done and Rescinded are only counted). Clicking a task there opens it on GitHub.

- **Token:** add a GitHub token as the `GITHUB_TOKEN` script property. It needs read-only access to the org's Projects, plus Issues and Pull requests for private repos.
- **Refreshing:** `refreshTasks` fetches both projects every 5 minutes and saves a copy that the board reads instantly. The board footer shows how old that copy is. If GitHub can't be reached, the board keeps showing the last copy and says so.
- **First setup:** run `installGitHubSync` once from the editor (or run `setup` again). It creates the 5-minute trigger and fetches the tasks straight away. Run `checkGitHub` at any time to see each project's statuses and item counts.
- **Priority order:** anyone at the board can drag a task up or down within its column by its ⠿ grip, on the board panels or the expanded view. This works with a mouse or a touchscreen, and the arrow keys also work when the grip has focus. The order is saved in the `TASK_ORDER` script property and only affects the board; GitHub isn't changed. Tasks that haven't been placed (for example, new ones) appear after the placed ones, in GitHub's order. To reset the order, delete the `TASK_ORDER` property.
- **Changing projects or names:** edit `GITHUB_BOARD_PROJECTS` near the top of the GitHub section in `Code.gs`. Statuses are matched by name: "in progress", "ready", "review", "help/hold/blocked" and "done/rescinded" are recognized, and anything else counts as backlog.

## Season hours

The **Season hours** page (`/big-board/hours/`, linked from the admin page) shows each student's hours from check-ins. It uses the admin passcode.

- **Season start and weekly goal:** set them at the top of the page. They're stored as the `SEASON_START` and `WEEKLY_GOAL` script properties. Week 1 is the 7 days starting on the season start date, so if you start on kickoff (a Saturday), each week runs Saturday through Friday.
- **Meeting days:** any day with at least one check-in.
- **Weekly summary:** each student's hours per week, with a ✓ when they met that week's goal, plus their total, average per finished week, and weeks at goal. The current week shows "so far" and isn't counted as met or missed.
- **Adjusting one week's goal:** if a meeting is canceled for weather, type a new target for that week in the **Goal** row. Clear the box to go back to the default. The overrides are stored in the `WEEK_GOALS` script property.
- **By meeting day:** hours for each day the team met, grouped by week, for one week or the whole season.
- **Season summary:** the whole season at a glance.
  - Team numbers: total hours, meeting days, average students per meeting, and students on track.
  - A chart of how many students checked in each meeting day.
  - A row per student with total hours, % of the goal for finished weeks, days attended, average per week, weeks at goal, best week, and last check-in.
- **Download CSV:** saves every student's hours for every meeting day, plus weekly totals and goals, for record keeping. The button is available on all three views.
- **Student details:** click a student's name to see their hours per week (each week's goal is a dashed mark) and per meeting day.
- **Auto-closed sessions:** hours that include an automatic midnight checkout are marked with `*`, so you can check them on the admin page.

## API

All requests must include `code`, the passcode.

| Request | Response |
|---|---|
| `GET ?view=ping&code=…` | `{ "ok": true }`, used to check a passcode |
| `GET ?view=admin&code=ADMIN…` | `{ "ok": true, "announcements": [{ "id", "text", "showFrom", "showUntil" }], "deadlines": [{ "id", "title", "date", "category" }] }`, with all rows rather than only what the board shows |
| `POST` with body `{"action":"announcement.add", "text", "code":"ADMIN…"}`; `announcement.update` also takes `id`, and `announcement.delete` takes only `id` | the same as `view=admin`, after the change |
| `POST` with body `{"action":"deadline.add", "title", "date":"yyyy-MM-dd", "category", "code":"ADMIN…"}`; `deadline.update` also takes `id`, and `deadline.delete` takes only `id` | the same as `view=admin`, after the change |
| `GET ?view=sessions&date=yyyy-MM-dd&code=ADMIN…` | `{ "ok": true, "date", "sessions": [{ "row", "id", "in", "out", "hours", "autoClosed" }], "students": [{ "id" }] }`, the sessions that started that day |
| `GET ?view=sessionDays&month=yyyy-MM&code=ADMIN…` | `{ "ok": true, "days": { "yyyy-MM-dd": count } }` |
| `POST` with body `{"action":"session.add", "id", "in", "out", "day", "code":"ADMIN…"}`; `session.update` takes `row`, `id`, `origIn`, `in` and `out`, and `session.delete` takes `row`, `id` and `origIn` | the same as `view=sessions` for `day`. `in` and `out` are ISO times, and a blank `out` means the student is still here, which is only allowed for today. `row` plus `id` and `origIn` must still match the sheet, or the edit is refused. |
| `GET ?view=hours&code=ADMIN…` | `{ "ok": true, "settings": { "seasonStart", "weeklyGoal", "weekGoals" }, "today", "meetingDays": [day], "students": [{ "id", "name", "subteam", "active", "days": { day: hours }, "autoDays": [day] }] }` |
| `POST` with body `{"action":"settings.update", "seasonStart", "weeklyGoal", "code":"ADMIN…"}`, or `{"action":"weekGoal.set", "week", "goal", "code":"ADMIN…"}` (a blank `goal` goes back to the default) | the same as `view=hours` |
| `GET ?view=board&code=…` | `{ "ok": true, "here": [students checked in], "rosterCount", "announcements": [{ "text" }], "deadlines": [{ "title", "date", "category", "daysLeft" }] }` |
| `GET ?view=roster&code=…` | `{ "ok": true, "students": [{ "id", "name", "subteam", "checkedIn", "since", "todayMs" }] }`, where `id` is `First Last`, `name` is the display name, and `todayMs` is the total of today's finished sessions in milliseconds (not counting an open one) |
| `POST` with body `{"action":"set","items":[{"id":"Alex Rivera","checkedIn":true,"at":"<ISO time>"}],"code":"…"}` | `{ "ok": true, "students": [{ … } or { "id", "error" }] }`. This is what the kiosk uses. It sends a batch of taps, each giving the state the student should end up in, so repeating a request is harmless. `at` is the tap time on the tablet; it's used if it falls within the last 12 hours, and otherwise the server time is used. |
| `POST` with body `{"action":"toggle","id":"Alex Rivera","code":"…"}` | `{ "ok": true, "student": { … } }`. This is the older single-tap form. |

Notes:
- Errors come back as `{ "ok": false, "error": "…" }`. The possible errors are `unauthorized`, `unknown student`, `unknown view`, `unknown action`, `bad request`, `passcode not configured` and `server error`.
- Send POSTs with `Content-Type: text/plain`. Browsers send `application/json` with a preflight request, and Apps Script can't answer it.
- With `toggle`, a second tap on the same name within 5 seconds is ignored, and the response returns the student's current state. The kiosk handles double taps itself, by ignoring a second tap on a tile within 0.6 seconds.

## Testing with curl

Apps Script redirects every request, so always use `-L`:

```sh
URL="https://script.google.com/macros/s/XXXX/exec"

curl -L "$URL?view=roster&code=wrong"        # expect: unauthorized
curl -L "$URL?view=roster&code=$PASSCODE"    # expect: roster
curl -L -H "Content-Type: text/plain" \
  -d "{\"action\":\"toggle\",\"id\":\"Alex Rivera\",\"code\":\"$PASSCODE\"}" "$URL"
```
