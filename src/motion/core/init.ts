import { RuntimeLoader } from '@rive-app/react-canvas'
import { gsap } from 'gsap'
import CustomEase from 'gsap/dist/CustomEase'
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin'

import { customEases, favouriteEases } from '../eases/eases'

export const riveWASMResource = require('@rive-app/canvas/rive.wasm')

export function initRive() {
  if (typeof window === 'undefined') return
  RuntimeLoader.setWasmUrl(riveWASMResource)
}

export function initGsap() {
  if (typeof window === 'undefined') return

  gsap.registerPlugin(CustomEase, ScrollToPlugin)

  gsap.defaults({ ease: 'none', duration: 1 })

  Object.values(favouriteEases).forEach((ease) => {
    CustomEase.create(ease.name, ease.ease)
  })

  Object.values(customEases).forEach((ease) => {
    CustomEase.create(ease.name, ease.ease)
  })

  gsap.registerEffect(require('@/motion/effects/fade/fadeIn/fadeIn').default)
}
