import type { StoryFn } from '@storybook/react'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

import { easeNames } from '@/motion/eases/eases'

import { BaseImage } from '@/components/BaseImage'

import fadeIn from './fadeIn'

export default { title: 'motion/Effects/fade/fadeIn' }

gsap.registerEffect(fadeIn)

export const Default: StoryFn = (args) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeline = gsap.timeline()
    const el = ref.current
    if (el) timeline.fadeIn(el!, args, 0.4)
    return () => {
      timeline.kill()
      if (el) gsap.set(el, { opacity: 0 })
    }
  }, [args])

  return (
    <div ref={ref} style={{ opacity: 0 }}>
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
