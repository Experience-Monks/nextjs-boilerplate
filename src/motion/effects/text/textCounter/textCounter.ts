import { gsap } from 'gsap'

const effect: CustomEffectConfig = {
  name: 'textCounter',
  effect: (target, config = {}) => {
    const element = (target as unknown as HTMLElement[])[0]
    const counter = { value: config.start || 0 }

    return gsap.timeline().to(counter, {
      value: config.end,
      duration: config.duration,
      ease: config.ease,
      delay: config.delay,
      onUpdate() {
        if (!element) return
        element.textContent = counter.value.toFixed(0)
      }
    })
  },
  defaults: {
    duration: 2,
    delay: 0,
    start: 0,
    end: 0,
    ease: 'power3.in'
  },
  extendTimeline: true
}

export default effect
