// Shared by the Argos big board (big-board.html) and check-in kiosk (big-board-checkin.html):
// the Apps Script URL, the saved team passcode and the server call.
// Backend: apps-script/big-board/ (see its README.md).
window.BigBoard = (function () {
  // The /exec URL from the Apps Script deployment. It isn't secret: every
  // request also needs the team passcode.
  const EXEC_URL = 'https://script.google.com/macros/s/AKfycbzFxz9_HZjw_zzALEnlNf4AJk3ryZAQ_hz28qpF1QJjRq7BCR5P_-umJJvR7yMJQuwH/exec';

  // Saved per device, so the TV and the kiosk tablet only need the passcode once.
  const CODE_KEY = 'argosBigBoard.code';
  let code = '';
  try { code = localStorage.getItem(CODE_KEY) || ''; } catch (e) {}

  function setCode(v) {
    code = v || '';
    try { code ? localStorage.setItem(CODE_KEY, code) : localStorage.removeItem(CODE_KEY); } catch (e) {}
  }

  /**
   * GET when only params are given, POST when body is given. Resolves to the
   * server's JSON ({ ok: true, ... } or { ok: false, error }). Rejects if the
   * server can't be reached. tryCode checks a passcode without saving it.
   */
  async function api(params, body, tryCode) {
    if (!/^https:\/\/script\.google\.com\//.test(EXEC_URL)) throw new Error('not configured');
    const c = tryCode === undefined ? code : tryCode;
    const res = body
      // text/plain avoids a CORS preflight, which Apps Script can't answer.
      ? await fetch(EXEC_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ ...body, code: c }) })
      : await fetch(EXEC_URL + '?' + new URLSearchParams({ ...params, code: c }));
    return res.json();
  }

  /** User-facing message for a failed unlock attempt. */
  function unlockError(errOrData) {
    if (errOrData instanceof Error) {
      return errOrData.message === 'not configured'
        ? 'This page is not connected yet. Set EXEC_URL in big-board-common.js.'
        : "Can't reach the server. Check the Wi-Fi and try again.";
    }
    return errOrData.error === 'unauthorized' ? 'Wrong passcode.' : 'Server error: ' + errOrData.error;
  }

  return {
    get code() { return code; },
    setCode,
    api,
    unlockError,
  };
})();
