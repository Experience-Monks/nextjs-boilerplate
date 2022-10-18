import { UrlObject } from 'url';

function isRoutedHref(href?: string | UrlObject, download = false) {
  if (!href) return false;
  const pathname = typeof href === 'string' ? href : href?.pathname || '';
  return (pathname?.startsWith('#') || pathname?.startsWith('/')) && !download;
}

export default isRoutedHref;
