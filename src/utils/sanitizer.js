import xss from 'xss';

/**
 * DOM Sanitizer to protect against untrust inputs and XSS attacks
 *
 * @param {string} [dirtyInput=''] - Input to sanitize
 */
function sanitizer(dirtyInput, ...options) {
  return xss(dirtyInput, options);
}

export default sanitizer;
