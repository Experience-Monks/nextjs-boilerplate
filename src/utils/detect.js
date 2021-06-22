export const isBrowser = typeof window !== 'undefined';

const detect = {
  device: { isDesktop: true },
  browser: {},
  os: {},
  bots: {}
};

if (isBrowser) {
  detect.device = require('@jam3/detect').device;
  detect.browser = require('@jam3/detect').browser;
  detect.os = require('@jam3/detect').os;
  detect.bots = require('@jam3/detect').bots;
}

export const isTouchDevice =
  isBrowser && ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);

export default detect;
