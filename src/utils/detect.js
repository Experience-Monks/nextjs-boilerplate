const detect = {
  device: { isDesktop: true },
  browser: {},
  os: {},
  bots: {}
};

if (typeof window !== 'undefined') {
  detect.device = require('@jam3/detect').device;
  detect.browser = require('@jam3/detect').browser;
  detect.os = require('@jam3/detect').os;
  detect.bots = require('@jam3/detect').bots;
}

export default detect;
