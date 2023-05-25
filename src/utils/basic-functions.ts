export function noop() {
  // no op function
}

export function getScrollTop() {
  return window.scrollY || document.body.scrollTop
}

export function getScrollLeft() {
  return window.scrollX || document.body.scrollLeft
}

/**
 * return url string without trailing splash
 *
 * @export
 * @param {string} [path='']
 * @param {boolean} [cleanParams=false]
 * @returns {string}
 */
export function cleanUrl(path = '', cleanParams = false): string {
  if (!path) {
    return ''
  }
  if (cleanParams) {
    path = path?.split('?')[0]
  }
  if (path === '/') {
    return '/'
  }

  return path.replace(/\/$/, '').replace(/^\//, '') || ''
}
