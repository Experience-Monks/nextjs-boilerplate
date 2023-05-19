import config from '@/data/config.json'

import { browser, device, os } from '@/utils/detect'

function setBodyClasses() {
  const classes = [
    device.mobile ? 'mobile-device' : '',
    device.touch ? 'touch-device' : '',
    device.type,
    browser.name,
    os.name
  ].filter(Boolean)
  classes.forEach((c) => document.body.classList.add(c.toLowerCase().split(' ').join('-')))

  // un-hide page once application kicked in
  if (config.hideStaticHtml) {
    document.documentElement.classList.remove('hide-static-html')
  }
}

export default setBodyClasses
