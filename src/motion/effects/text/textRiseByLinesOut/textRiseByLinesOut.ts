import { gsap } from 'gsap'

import { effectTimeline } from '@/motion/core/effect-timeline'
import { SafeSplitText } from '@/motion/core/safe-split-text'

const effect: CustomEffectConfig = {
  name: 'textRiseByLinesOut',
  effect: (target, config = {}) => {
    return effectTimeline(config.duration!, config.reversed!, () => {
      const element = (target as unknown as HTMLElement[])[0]
      const split1 = new SafeSplitText(element, { type: 'lines' })
      const split2 = new SafeSplitText(split1.lines, { type: 'lines' })
      return gsap //
        .timeline({ paused: true })
        .set(split1.lines, { overflow: 'hidden' })
        .to(split2.lines, {
          yPercent: 105,
          duration: config.lineDuration,
          stagger: config.lineOffset,
          ease: config.ease
        })
    })
  },
  defaults: {
    ease: 'expo.in',
    duration: +(gsap.defaults().duration || 1),
    lineDuration: 1,
    lineOffset: 0.1
  },
  extendTimeline: true
}

export default effect
