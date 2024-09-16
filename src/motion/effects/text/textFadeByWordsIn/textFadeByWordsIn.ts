import { gsap } from 'gsap'

import { effectTimeline } from '@/motion/core/effect-timeline'
import { SafeSplitText } from '@/motion/core/safe-split-text'

const setup = (target: Element): [element: HTMLElement, split: SafeSplitText] => {
  const element = (target as unknown as HTMLElement[])[0]
  const split = new SafeSplitText(element, { type: 'lines,words' })
  gsap.set(split.lines, { opacity: 0 })
  return [element, split]
}

const effect: CustomEffectConfig = {
  name: 'textFadeByWordsIn',
  effect: (target, config = {}) => {
    if (config.immediateRender) setup(target)

    return effectTimeline(config.duration!, config.reversed!, () => {
      const [element, split] = setup(target)
      const words = config.shuffle ? gsap.utils.shuffle(split.words) : split.words
      return gsap
        .timeline({ paused: true })
        .set(element, { opacity: 1 })
        .set(split.lines, { opacity: 1 })
        .set(words, { opacity: 0 })
        .to(words, {
          opacity: 1,
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
    shuffle: false,
    immediateRender: false
  },
  extendTimeline: true
}

export default effect
