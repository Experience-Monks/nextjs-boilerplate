import type { IFilterXSSOptions } from 'xss'

import xss from 'xss'

/**
 * DOM Sanitizer to protect against untrust inputs and XSS attacks
 *
 * @param {string} [dirtyInput=''] - Input to sanitize
 */
export function sanitizer(dirtyInput: string, options?: IFilterXSSOptions): string {
  return xss(dirtyInput, options)
}
