import { gsap } from 'gsap'

const effect: CustomEffectConfig = {
  name: 'fadeIn',
  effect: (target, config = {}) => {
    return gsap.timeline().to(target, { ...config, autoAlpha: 1 })
  },
  extendTimeline: true
}

export default effect
