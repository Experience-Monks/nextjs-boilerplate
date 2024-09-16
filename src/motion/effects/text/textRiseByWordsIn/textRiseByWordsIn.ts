import { gsap } from 'gsap'

import { effectTimeline } from '@/motion/core/effect-timeline'
import { SafeSplitText } from '@/motion/core/safe-split-text'

const setup = (target: Element): [element: HTMLElement, split: SafeSplitText] => {
  const el = (target as unknown as HTMLElement[])[0]
  const s = new SafeSplitText(el, { type: 'lines,words' })
  gsap.set(s.lines, { opacity: 0 })
  return [el, s]
}

const effect: CustomEffectConfig = {
  name: 'textRiseByWordsIn',
  effect: (target, config = {}) => {
    if (config.immediateRender) setup(target)
    return effectTimeline(config.duration!, config.reversed!, () => {
      const [element, split] = setup(target)
      return gsap
        .timeline({ paused: true })
        .set(element, { opacity: 1 })
        .set(split.lines, { opacity: 1 })
        .set(split.words, { yPercent: 105 })
        .set(split.lines, { overflow: 'hidden' })
        .to(split.words, {
          yPercent: 0,
          duration: config.wordDuration,
          stagger: config.wordOffset,
          ease: config.ease
        })
    })
  },
  defaults: {
    ease: 'expo.out',
    duration: +(gsap.defaults().duration || 1),
    wordDuration: 1,
    wordOffset: 0.1,
    immediateRender: false
  },
  extendTimeline: true
}

export default effect
