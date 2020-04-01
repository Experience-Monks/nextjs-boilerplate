import dompurify from 'dompurify';

/**
 * DOM Sanitizer to protect against untrust inputs and XSS attacks
 *
 * @param {string} [dirtyInput=''] - Input to sanitize
 * @param {object} [options={}] - Options to verride default config
 */
function sanitizer(dirtyInput: string = '', options: Object = {}): string {
  return dompurify.sanitize(dirtyInput, options);
}

export default sanitizer;
