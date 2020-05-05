import dompurify from 'dompurify';

/**
 * DOM Sanitizer to protect against untrust inputs and XSS attacks
 */
function sanitizer(dirtyInput: string, options?: any) {
  return dompurify.sanitize(dirtyInput, options);
}

export default sanitizer;
