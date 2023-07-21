import { gsap } from 'gsap'

import config from '@/data/config.json'

import ResizeService from '@/services/resize'

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

  // Fix vh problem on mobile
  const calculateVh = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)
  }
  ResizeService.listen(calculateVh)
  calculateVh()

  // un-hide page once application kicked in
  if (!config.supportsNoJs) gsap.set(document.documentElement, { autoAlpha: 1 })
}

export default setBodyClasses
