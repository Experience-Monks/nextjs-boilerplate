import { gsap } from 'gsap'

import { effectTimeline } from '@/motion/core/effect-timeline'
import { SafeSplitText } from '@/motion/core/safe-split-text'

const setup = (target: Element): [element: HTMLElement, split: SafeSplitText] => {
  const textEl = (target as unknown as HTMLElement[])[0]
  const splitTxt = new SafeSplitText(textEl, { type: 'lines' })
  gsap.set(splitTxt.lines, { opacity: 0 })
  return [textEl, splitTxt]
}

const effect: CustomEffectConfig = {
  name: 'textFadeByLinesIn',
  effect: (target, config = {}) => {
    if (config.immediateRender) setup(target)

    return effectTimeline(config.duration!, config.reversed!, () => {
      const [element, split] = setup(target)
      const lines = config.shuffle ? gsap.utils.shuffle(split.lines) : split.lines
      return gsap //
        .timeline({ paused: true })
        .set(element, { opacity: 1 })
        .to(lines, {
          opacity: 1,
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
    shuffle: false,
    immediateRender: false
  },
  extendTimeline: true
}

export default effect
