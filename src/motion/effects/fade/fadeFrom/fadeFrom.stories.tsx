import { useEffect, useRef } from 'react'
import { StoryFn } from '@storybook/react'
import gsap from 'gsap'

import eases from '@/motion/eases/eases'

import BaseImage from '@/components/BaseImage/BaseImage'

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
      <BaseImage data={require('@/assets/images/test.png').default} />
    </div>
  )
}

Default.args = {
  duration: 1,
  ease: 'expo.out',
  x: 0,
  y: 40,
  scale: 1,
  rotate: 0
}

Default.argTypes = {
  ease: { options: eases.map((e) => e.name), control: { type: 'select' } }
}
