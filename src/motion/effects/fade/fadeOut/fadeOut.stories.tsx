import type { StoryFn } from '@storybook/react'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

import { easeNames } from '@/motion/eases/eases'

import { BaseImage } from '@/components/BaseImage'

import fadeOut from './fadeOut'

export default { title: 'motion/Effects/fade/fadeOut' }

gsap.registerEffect(fadeOut)

export const Default: StoryFn = (args) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeline = gsap.timeline()
    const el = ref.current
    if (el) timeline.fadeOut(el!, args, 0.4)
    return () => {
      timeline.kill()
      if (el) gsap.set(el, { opacity: 1 })
    }
  }, [args])

  return (
    <div ref={ref} style={{ opacity: 1 }}>
      <BaseImage src={require('@/assets/images/test.png').default.src} />
    </div>
  )
}

Default.args = {
  duration: 1,
  ease: easeNames[0]
}

Default.argTypes = {
  ease: { options: easeNames, control: { type: 'select' } }
}
