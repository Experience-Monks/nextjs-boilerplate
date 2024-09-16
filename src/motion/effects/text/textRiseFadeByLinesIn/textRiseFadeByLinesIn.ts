import { gsap } from 'gsap'

import { effectTimeline } from '@/motion/core/effect-timeline'
import { SafeSplitText } from '@/motion/core/safe-split-text'

const setup = (target: Element): [element: HTMLElement, split: SafeSplitText] => {
  const targetElement = (target as unknown as HTMLElement[])[0]
  const split = new SafeSplitText(targetElement, { type: 'lines' })
  gsap.set(split.lines, { opacity: 0 })
  return [targetElement, split]
}

const effect: CustomEffectConfig = {
  name: 'textRiseFadeByLinesIn',
  effect: (target, config = {}) => {
    if (config.immediateRender) setup(target)

    return effectTimeline(config.duration!, config.reversed!, () => {
      const [element, split] = setup(target)
      return gsap
        .timeline({ paused: true })
        .set(element, { opacity: 1 })
        .set(split.lines, { opacity: 1 })
        .set(split.lines, { y: config.y, opacity: 0 })
        .to(split.lines, {
          y: 0,
          duration: config.lineDuration,
          stagger: config.lineOffset,
          ease: config.ease
        })
        .to(
          split.lines,
          {
            opacity: 1,
            ease: 'none',
            duration: config.lineDuration! / 2,
            stagger: config.lineOffset
          },
          '<'
        )
    })
  },
  defaults: {
    ease: 'expo.out',
    duration: +(gsap.defaults().duration || 1),
    lineDuration: 1,
    lineOffset: 0.2,
    y: '2rem',
    immediateRender: false
  },
  extendTimeline: true
}

export default effect
