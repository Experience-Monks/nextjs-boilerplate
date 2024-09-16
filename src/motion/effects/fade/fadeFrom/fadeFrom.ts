import { gsap } from 'gsap'

const effect: CustomEffectConfig = {
  name: 'fadeFrom',
  effect: (target, config) => {
    return gsap.timeline().from(target, { ...config, opacity: 0 })
  },
  defaults: {
    duration: +(gsap.defaults().duration || 1)
  },
  extendTimeline: true
}

export default effect
