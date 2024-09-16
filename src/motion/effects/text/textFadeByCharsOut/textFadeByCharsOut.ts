import { gsap } from 'gsap'

import { effectTimeline } from '@/motion/core/effect-timeline'
import { SafeSplitText } from '@/motion/core/safe-split-text'

const effect: CustomEffectConfig = {
  name: 'textFadeByCharsOut',
  effect: (target, config = {}) => {
    return effectTimeline(config.duration!, config.reversed!, () => {
      const element = (target as unknown as HTMLElement[])[0]
      const split = new SafeSplitText(element, { type: 'words,chars' })
      const chars = config.shuffle ? gsap.utils.shuffle(split.chars) : split.chars
      return gsap //
        .timeline({ paused: true })
        .set(split.words, { overflow: 'hidden', display: 'inline-flex' })
        .to(chars, {
          opacity: 0,
          duration: config.charDuration,
          stagger: config.charOffset,
          ease: config.ease
        })
    })
  },
  defaults: {
    ease: 'none',
    duration: +(gsap.defaults().duration || 1),
    charDuration: 1,
    charOffset: 0.1,
    shuffle: false
  },
  extendTimeline: true
}

export default effect
