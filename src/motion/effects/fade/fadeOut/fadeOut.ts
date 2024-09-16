import { gsap } from 'gsap'

const effect: CustomEffectConfig = {
  name: 'fadeOut',
  effect: (target, config = {}) => {
    return gsap.timeline().to(target, { ...config, autoAlpha: 0 })
  },
  extendTimeline: true
}

export default effect
