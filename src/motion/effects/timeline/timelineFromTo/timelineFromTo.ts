import { gsap } from 'gsap'

import { effectTimeline } from '@/motion/core/effect-timeline'

const effect: CustomEffectConfig = {
  name: 'timelineFromTo',
  effect: (target, config = {}) => {
    const tl = (target as unknown as (gsap.core.Timeline | (() => gsap.core.Timeline))[])[0]

    return effectTimeline(config.duration!, config.reversed!, () => {
      const timeline = typeof tl === 'function' ? tl() : tl
      return gsap.timeline({ paused: true }).add(
        timeline.tweenFromTo(timeline.duration() * (config.from ?? 0), timeline.duration() * (config.to ?? 1), {
          duration: config.duration,
          ease: config.ease
        })
      )
    })
  },
  defaults: {
    ease: 'none',
    from: 0,
    to: 1,
    duration: +(gsap.defaults().duration || 1)
  },
  extendTimeline: true
}

export default effect
