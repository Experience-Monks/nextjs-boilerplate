/**
 * return url string without trailing splash
 *
 * @export
 * @param {string} [path='']
 * @param {boolean} [cleanParams=false]
 * @returns {string}
 */
export function cleanUrl(path = '', cleanParams = false): string {
  if (!path) return '';
  if (cleanParams) path = path?.split('?')[0];
  if (path === '/') return '/';
  return path.replace(/\/$/, '').replace(/^\//, '') || '';
}

/**
 * check whether user browser supports webp format or not
 *
 * @export
 * @param {keyof typeof testImages} feature
 * @param {(isSupported: boolean) => void} callback
 */
const testImages = {
  lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
  lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
  alpha:
    'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
  animation:
    'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA'
};

export function checkWebpSupport(feature: keyof typeof testImages, callback: (isSupported: boolean) => void): void {
  var img = new Image();
  img.onload = function () {
    var result = img.width > 0 && img.height > 0;
    callback(result);
  };
  img.onerror = function () {
    callback(false);
  };
  img.src = 'data:image/webp;base64,' + testImages[feature];
}
