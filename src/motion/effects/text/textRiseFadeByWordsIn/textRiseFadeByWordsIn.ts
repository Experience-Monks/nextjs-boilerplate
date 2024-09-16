import { gsap } from 'gsap'

import { effectTimeline } from '@/motion/core/effect-timeline'
import { SafeSplitText } from '@/motion/core/safe-split-text'

const setup = (target: Element): [element: HTMLElement, split: SafeSplitText] => {
  const textEl = (target as unknown as HTMLElement[])[0]
  const splitTx = new SafeSplitText(textEl, { type: 'lines,words' })
  gsap.set(splitTx.lines, { opacity: 0 })
  return [textEl, splitTx]
}

const effect: CustomEffectConfig = {
  name: 'textRiseFadeByWordsIn',
  effect: (target, config = {}) => {
    if (config.immediateRender) setup(target)

    return effectTimeline(config.duration!, config.reversed!, () => {
      const [element, split] = setup(target)
      return gsap
        .timeline({ paused: true })
        .set(element, { opacity: 1 })
        .set(split.lines, { opacity: 1 })
        .set(split.words, { y: config.y, opacity: 0 })
        .to(split.words, {
          y: 0,
          duration: config.wordDuration,
          stagger: config.wordOffset,
          ease: config.ease
        })
        .to(
          split.words,
          {
            opacity: 1,
            ease: 'none',
            duration: config.wordDuration! / 2,
            stagger: config.wordOffset
          },
          '<'
        )
    })
  },
  defaults: {
    ease: 'expo.out',
    duration: +(gsap.defaults().duration || 1),
    wordDuration: 1,
    wordOffset: 0.1,
    y: '2rem',
    immediateRender: false
  },
  extendTimeline: true
}

export default effect
