import { browser, device, os } from '@jam3/detect';

import { hideStaticHtml } from '@/data/settings';

function setBodyClasses() {
  const classes = [
    device.mobile ? 'mobile-device' : '',
    device.touch ? 'touch-device' : '',
    device.type,
    browser.name,
    os.name
  ].filter(Boolean);
  classes.forEach((c) => document.body.classList.add(c.toLowerCase().split(' ').join('-')));

  // un-hide page once application kicked in
  if (hideStaticHtml) {
    document.documentElement.classList.remove('hide-static-html');
  }
}

export default setBodyClasses;
