import { gsap } from 'gsap'

import { effectTimeline } from '@/motion/core/effect-timeline'
import { SafeSplitText } from '@/motion/core/safe-split-text'

const effect: CustomEffectConfig = {
  name: 'textFadeByLinesOut',
  effect: (target, config = {}) => {
    return effectTimeline(config.duration!, config.reversed!, () => {
      const element = (target as unknown as HTMLElement[])[0]
      const split = new SafeSplitText(element, { type: 'lines' })
      const lines = config.shuffle ? gsap.utils.shuffle(split.lines) : split.lines
      return gsap //
        .timeline({ paused: true })
        .to(lines, {
          opacity: 0,
          duration: config.lineDuration,
          stagger: config.lineOffset,
          ease: config.ease
        })
    })
  },
  defaults: {
    ease: 'none',
    duration: +(gsap.defaults().duration || 1),
    lineDuration: 1,
    lineOffset: 0.2,
    shuffle: false
  },
  extendTimeline: true
}

export default effect
