import { gsap } from 'gsap'
import CustomEase from 'gsap/dist/CustomEase'

import { customEases } from './eases/eases'

const registerEffect: gsap.RegisterEffect = gsap.registerEffect

function initGsap() {
  if (typeof window === 'undefined') return

  gsap.registerPlugin(CustomEase)

  gsap.defaults({ ease: 'none', duration: 1 })

  customEases.forEach((ease) => {
    CustomEase.create(ease.name, ease.ease)
  })

  registerEffect({
    name: 'fadeIn',
    extendTimeline: true,
    effect: (targets, config) => {
      return gsap.from(targets, {
        duration: config.duration,
        opacity: 0,
        y: config.y,
        delay: config.delay,
        stagger: config.stagger
      })
    },
    defaults: { duration: 0.667, y: 20, delay: 0, stagger: 0 }
  })
}

export default initGsap
