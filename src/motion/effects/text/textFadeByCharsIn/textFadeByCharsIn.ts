import { gsap } from 'gsap'

import { effectTimeline } from '@/motion/core/effect-timeline'
import { SafeSplitText } from '@/motion/core/safe-split-text'

const setup = (target: Element): [element: HTMLElement, split: SafeSplitText] => {
  const textElement = (target as unknown as HTMLElement[])[0]
  const splitText = new SafeSplitText(textElement, { type: 'words,chars' })
  gsap.set(splitText.words, { opacity: 0 })
  return [textElement, splitText]
}

const effect: CustomEffectConfig = {
  name: 'textFadeByCharsIn',
  effect: (target, config = {}) => {
    if (config.immediateRender) setup(target)

    return effectTimeline(config.duration!, config.reversed!, () => {
      const [element, split] = setup(target)
      const chars = config.shuffle ? gsap.utils.shuffle(split.chars) : split.chars
      return gsap
        .timeline({ paused: true })
        .set(element, { opacity: 1 })
        .set(split.words, { opacity: 1 })
        .set(chars, { opacity: 0 })
        .to(chars, {
          opacity: 1,
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
    shuffle: false,
    immediateRender: false
  },
  extendTimeline: true
}

export default effect
