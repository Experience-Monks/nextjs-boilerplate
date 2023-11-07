import { gsap } from 'gsap'
import CustomEase from 'gsap/dist/CustomEase'

import { customEases } from '../eases/eases'

function initGsap() {
  if (typeof window === 'undefined') return

  gsap.registerPlugin(CustomEase)

  gsap.defaults({ ease: 'none', duration: 1 })

  customEases.forEach((ease) => {
    CustomEase.create(ease.name, ease.ease)
  })

  if (!process.env.STORYBOOK) {
    // Register only the effects you need.
    // Storybook will register all effects in .storybook/intro/Effects.stories.tsx
    gsap.registerEffect(require('@/motion/effects/fade/fadeIn/fadeIn').default)
  }
}

export default initGsap
