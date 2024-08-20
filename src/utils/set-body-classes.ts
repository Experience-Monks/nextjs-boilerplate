import { ResizeService } from '@/services/resize.service'

import { browser, device, os } from '@/utils/detect'

export function setBodyClasses() {
  const classes = [
    device.mobile ? 'mobile-device' : '',
    device.touch ? 'touch-device' : '',
    device.type,
    browser.name,
    os.name
  ].filter(Boolean)
  classes.forEach((c) => document.body.classList.add(c.toLowerCase().split(' ').join('-')))

  // Fix vh problem on mobile
  const calculateVh = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)
  }
  ResizeService.listen(calculateVh)
  calculateVh()
}
