import { gsap } from 'gsap'

import { effectTimeline } from '@/motion/core/effect-timeline'
import { SafeSplitText } from '@/motion/core/safe-split-text'

const setup = (target: Element): [element: HTMLElement, split: SafeSplitText] => {
  const tgtElement = (target as unknown as HTMLElement[])[0]
  const splitText = new SafeSplitText(tgtElement, { type: 'words,chars' })
  gsap.set(splitText.words, { opacity: 0 })
  return [tgtElement, splitText]
}

const effect: CustomEffectConfig = {
  name: 'textRiseByCharsIn',
  effect: (target, config = {}) => {
    if (config.immediateRender) setup(target)

    return effectTimeline(config.duration!, config.reversed!, () => {
      const [element, split] = setup(target)
      return gsap
        .timeline({ paused: true })
        .set(element, { opacity: 1 })
        .set(split.words, { opacity: 1 })
        .set(split.chars, { yPercent: 105 })
        .set(split.words, { overflow: 'hidden', display: 'inline-flex' })
        .to(split.chars, {
          yPercent: 0,
          duration: config.charDuration,
          stagger: config.charOffset,
          ease: config.ease
        })
    })
  },
  defaults: {
    ease: 'expo.out',
    duration: +(gsap.defaults().duration || 1),
    charDuration: 1,
    charOffset: 0.01,
    immediateRender: false
  },
  extendTimeline: true
}

export default effect
