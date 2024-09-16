import type { StoryFn } from '@storybook/react'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

import { easeNames } from '@/motion/eases/eases'

import { BaseImage } from '@/components/BaseImage'

import fadeFrom from './fadeFrom'

export default { title: 'motion/Effects/fade/fadeFrom' }

gsap.registerEffect(fadeFrom)

export const Default: StoryFn = (args) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeline = gsap.timeline()
    const el = ref.current
    if (el) timeline.fadeFrom(el!, args, 0.4)
    return () => {
      timeline.kill()
      if (el) gsap.set(el, { clearProps: 'all' })
    }
  }, [args])

  return (
    <div ref={ref}>
      <BaseImage src={require('@/assets/images/test.png').default.src} />
    </div>
  )
}

Default.args = {
  duration: 1,
  ease: easeNames[0],
  x: 0,
  y: 40,
  scale: 1,
  rotate: 0
}

Default.argTypes = {
  ease: { options: easeNames, control: { type: 'select' } }
}
