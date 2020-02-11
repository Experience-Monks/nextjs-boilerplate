import dompurify from 'dompurify';

/**
 * DOM Sanitizer to protect against untrust inputs and XSS attacks
 *
 * @param {string} [dirtyInput=''] - Input to sanitize
 */
function sanitizer(dirtyInput, ...options) {
  return dompurify.sanitize(dirtyInput, options);
}

export default sanitizer;
