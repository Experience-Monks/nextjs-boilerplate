import { useEffect, useRef } from 'react'
import { StoryFn } from '@storybook/react'
import { gsap } from 'gsap'

import eases from '@/motion/eases/eases'

import BaseImage from '@/components/BaseImage/BaseImage'

import fadeOut from './fadeOut'

export default { title: 'motion/effects/fade/fadeOut' }

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
      <BaseImage data={require('@/assets/images/test.png').default} />
    </div>
  )
}

Default.args = {
  duration: 1,
  ease: 'none'
}

Default.argTypes = {
  ease: { options: eases.map((e) => e.name), control: { type: 'select' } }
}
