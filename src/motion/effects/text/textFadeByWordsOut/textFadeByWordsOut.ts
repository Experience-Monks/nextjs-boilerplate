import { gsap } from 'gsap'

import { effectTimeline } from '@/motion/core/effect-timeline'
import { SafeSplitText } from '@/motion/core/safe-split-text'

const effect: CustomEffectConfig = {
  name: 'textFadeByWordsOut',
  effect: (target, config = {}) => {
    return effectTimeline(config.duration!, config.reversed!, () => {
      const element = (target as unknown as HTMLElement[])[0]
      const split = new SafeSplitText(element, { type: 'lines,words' })
      const words = config.shuffle ? gsap.utils.shuffle(split.words) : split.words
      return gsap //
        .timeline({ paused: true })
        .to(words, {
          opacity: 0,
          duration: config.wordDuration,
          stagger: config.wordOffset,
          ease: config.ease
        })
    })
  },
  defaults: {
    ease: 'none',
    duration: +(gsap.defaults().duration || 1),
    wordDuration: 1,
    wordOffset: 0.2,
    shuffle: false
  },
  extendTimeline: true
}

export default effect
