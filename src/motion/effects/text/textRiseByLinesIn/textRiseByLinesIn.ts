import { gsap } from 'gsap'

import { effectTimeline } from '@/motion/core/effect-timeline'
import { SafeSplitText } from '@/motion/core/safe-split-text'

const setup = (target: Element): [element: HTMLElement, split1: SafeSplitText, split2: SafeSplitText] => {
  const element = (target as unknown as HTMLElement[])[0]
  const split1 = new SafeSplitText(element, {
    type: 'lines',
    lineThreshold: 0.5 // <- fixes subscript/superscript
  })
  const split2 = new SafeSplitText(split1.lines, {
    type: 'lines',
    lineThreshold: 0.5 // <- fixes subscript/superscript
  })
  gsap.set(split1.lines, { opacity: 0 })
  return [element, split1, split2]
}

const effect: CustomEffectConfig = {
  name: 'textRiseByLinesIn',
  effect: (target, config = {}) => {
    if (config.immediateRender) setup(target)
    return effectTimeline(config.duration!, config.reversed!, () => {
      const [element, split1, split2] = setup(target)
      const timeline = gsap.timeline({ paused: true })
      timeline
        .set(element, { opacity: 1 })
        .set(split1.lines, { opacity: 1, height: '1.16em', display: 'flex', alignItems: 'flex-end' })
        .set(split2.lines, { yPercent: 120, width: '100%' })
        .set(split1.lines, { marginTop: '-0.16em' })
        .set(split1.lines, { overflow: 'hidden' })
        .to(split2.lines, {
          yPercent: 0,
          duration: config.lineDuration,
          stagger: config.lineOffset,
          ease: config.ease
        })
      if (config.revertOnComplete) {
        timeline.add(() => {
          split2.revert()
          split1.revert()
        })
      }
      return timeline
    })
  },
  defaults: {
    ease: 'expo.out',
    duration: +(gsap.defaults().duration || 1),
    lineDuration: 1,
    lineOffset: 0.1,
    immediateRender: false,
    revertOnComplete: false
  },
  extendTimeline: true
}

export default effect
