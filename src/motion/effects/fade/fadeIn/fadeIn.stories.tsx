import { useEffect, useRef } from 'react'
import { StoryFn } from '@storybook/react'
import { gsap } from 'gsap'

import eases from '@/motion/eases/eases'

import BaseImage from '@/components/BaseImage/BaseImage'

import fadeIn from './fadeIn'

export default { title: 'motion/effects/fade/fadeIn' }

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
      <BaseImage data={require('@/assets/images/test.png').default} />
    </div>
  )
}

Default.args = {
  duration: 1,
  ease: eases[0].name
}

Default.argTypes = {
  ease: { options: eases.map((e) => e.name), control: { type: 'select' } }
}
