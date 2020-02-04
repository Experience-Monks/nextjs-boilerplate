export const isBrowser = typeof window !== 'undefined';

const detect = {
  device: null,
  browser: null,
  os: null,
  bots: null
};

if (isBrowser) {
  detect.device = require('@jam3/detect').device;
  detect.browser = require('@jam3/detect').browser;
  detect.os = require('@jam3/detect').os;
  detect.bots = require('@jam3/detect').bots;
}

export default detect;
