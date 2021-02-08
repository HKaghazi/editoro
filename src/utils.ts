/**
 * Custom logger
 *
 * @param {boolean} labeled — if true, Editor.js label is shown
 * @param {string} msg  - message
 * @param {string} type - logging type 'log'|'warn'|'error'|'info'
 * @param {*} [args]      - argument to log with a message
 * @param {string} style  - additional styling to message
 */
function _log(
  labeled: boolean,
  msg: string,
  type = 'log',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args?: any,
  style = 'color: inherit'
): void {
  if (!('console' in window) || !window.console[type]) {
    return;
  }

  const isSimpleType = ['info', 'log', 'warn', 'error'].includes(type);
  const argsToPass = [];

  console.log(msg);
}

/**
 * _log method proxy without Editor.js label
 */
export const log = _log.bind(window, false);