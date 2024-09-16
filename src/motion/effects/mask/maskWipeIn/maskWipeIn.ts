import { gsap } from 'gsap'

import { effectTimeline } from '@/motion/core/effect-timeline'

type El = { tagName: string; style: { clipPath: string; webkitClipPath: string } }

const setup = (elements: El[], direction: string) => {
  if (direction === 'up' || direction === 'down') {
    const fromBottom = direction === 'up'
    elements.forEach((el) => {
      el.style.clipPath = el.style.webkitClipPath = fromBottom
        ? `polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)`
        : `polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)`
    })
  } else {
    const fromRight = direction === 'left'
    elements.forEach((el) => {
      el.style.clipPath = el.style.webkitClipPath = fromRight
        ? `polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)`
        : `polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)`
    })
  }
}

const effect: CustomEffectConfig = {
  name: 'maskWipeIn',
  effect: (target, config = {}) => {
    const elements = [target as unknown as El].flat().filter((el) => !!el.tagName)

    if (config.immediateRender) setup(elements, config.direction!)

    return effectTimeline(config.duration! + elements.length * config.stagger!, config.reversed!, () => {
      const timeline = gsap.timeline({ paused: true })

      setup(elements, config.direction!)

      if (config.direction === 'up' || config.direction === 'down') {
        const fromBottom = config.direction === 'up'
        const poly = fromBottom ? { a: 100, b: 100 } : { a: 0, b: 0 }

        for (const [i, el] of elements.entries()) {
          timeline
            .to(
              poly,
              {
                a: fromBottom ? 0 : 100,
                duration: config.duration,
                ease: config.ease,
                onUpdate: () => {
                  el.style.clipPath = el.style.webkitClipPath = fromBottom
                    ? `polygon(0% ${poly.a}%, 100% ${poly.b}%, 100% 100%, 0% 100%)`
                    : `polygon(0% 0%, 100% 0%, 100% ${poly.a}%, 0% ${poly.b}%)`
                }
              },
              i * config.stagger!
            )
            .to(
              poly,
              {
                b: fromBottom ? 0 : 100,
                duration: config.duration,
                ease: config.ease,
                onUpdate: () => {
                  el.style.clipPath = el.style.webkitClipPath = fromBottom
                    ? `polygon(0% ${poly.a}%, 100% ${poly.b}%, 100% 100%, 0% 100%)`
                    : `polygon(0% 0%, 100% 0%, 100% ${poly.a}%, 0% ${poly.b}%)`
                }
              },
              i * config.stagger! + config.offset!
            )
        }
      } else {
        const fromRight = config.direction === 'left'
        const poly = fromRight ? { a: 100, b: 100 } : { a: 0, b: 0 }

        for (const [i, el] of elements.entries()) {
          timeline
            .to(
              poly,
              {
                a: fromRight ? 0 : 100,
                duration: config.duration,
                ease: config.ease,
                onUpdate: () => {
                  el.style.clipPath = el.style.webkitClipPath = fromRight
                    ? `polygon(${poly.a}% 0%, 100% 0%, 100% 100%, ${poly.b}% 100%)`
                    : `polygon(0% 0%, ${poly.a}% 0%, ${poly.b}% 100%, 0% 100%)`
                }
              },
              i * config.stagger!
            )
            .to(
              poly,
              {
                b: fromRight ? 0 : 100,
                duration: config.duration,
                ease: config.ease,
                onUpdate: () => {
                  el.style.clipPath = el.style.webkitClipPath = fromRight
                    ? `polygon(${poly.a}% 0%, 100% 0%, 100% 100%, ${poly.b}% 100%)`
                    : `polygon(0% 0%, ${poly.a}% 0%, ${poly.b}% 100%, 0% 100%)`
                }
              },
              i * config.stagger! + config.offset!
            )
        }
      }

      return timeline
    })
  },
  defaults: {
    ease: 'expo.inOut',
    duration: +(gsap.defaults().duration || 1),
    direction: 'right',
    stagger: 0.1,
    offset: 0.016,
    immediateRender: true
  },
  extendTimeline: true
}

export default effect
