import type { StoryFn } from '@storybook/react'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

import { easeNames } from '@/motion/eases/eases'

import { BaseImage } from '@/components/BaseImage'

import timelineFromTo from './timelineFromTo'

export default { title: 'motion/Effects/timeline/timelineFromTo' }

gsap.registerEffect(timelineFromTo)

export const Default: StoryFn = (args) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = gsap.timeline({ paused: true }).fromTo(ref.current, { rotate: 0 }, { duration: 123, rotate: 360 })

    const timeline = gsap.timeline()
    if (ref.current) timeline.timelineFromTo(target, args, 0.4)

    return () => {
      timeline.kill()
    }
  }, [args])

  return (
    <div ref={ref}>
      <BaseImage src={require('@/assets/images/test.png').default.src} />
    </div>
  )
}

Default.args = {
  duration: 2,
  from: 0,
  to: 1,
  ease: 'expo.inOut'
}

Default.argTypes = {
  ease: { options: easeNames, control: { type: 'select' } }
}
