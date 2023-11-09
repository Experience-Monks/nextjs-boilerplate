import { gsap } from 'gsap'
import CustomEase from 'gsap/dist/CustomEase'

import { customEases, favouriteEases } from '../eases/eases'

function initGsap() {
  if (typeof window === 'undefined') return

  gsap.registerPlugin(CustomEase)

  gsap.defaults({ ease: 'none', duration: 1 })

  favouriteEases.forEach((ease) => {
    CustomEase.create(ease.name, ease.ease)
  })

  customEases.forEach((ease) => {
    CustomEase.create(ease.name, ease.ease)
  })

  gsap.registerEffect(require('@/motion/effects/fade/fadeIn/fadeIn').default)
}

export default initGsap
