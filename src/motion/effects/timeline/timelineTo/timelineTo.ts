import { gsap } from 'gsap'

const effect: CustomEffectConfig = {
  name: 'timelineTo',
  effect: (target, config = {}) => {
    const tl = (target as unknown as gsap.core.Timeline[])[0]
    return gsap.timeline().add(
      tl.tweenTo(tl.duration() * (config.to || 1), {
        duration: config.duration,
        ease: config.ease
      })
    )
  },
  defaults: {
    to: 1,
    ease: 'none',
    duration: +(gsap.defaults().duration || 1)
  },
  extendTimeline: true
}

export default effect
