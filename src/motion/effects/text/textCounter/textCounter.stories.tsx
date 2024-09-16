import type { StoryFn } from '@storybook/react'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

import { easeNames } from '@/motion/eases/eases'

import textCounter from './textCounter'

export default { title: 'motion/Effects/text/textCounter' }

gsap.registerEffect(textCounter)

export const Default: StoryFn = (args) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeline = gsap.timeline()
    if (ref.current) timeline.textCounter(ref.current!, args, 0.4)
    return () => {
      timeline.kill()
    }
  }, [args])

  return <div ref={ref} style={{ fontSize: '10rem' }} />
}

Default.args = {
  start: 0,
  end: 1000,
  duration: 2,
  ease: 'expo.inOut'
}

Default.argTypes = {
  ease: { options: easeNames, control: { type: 'select' } }
}
