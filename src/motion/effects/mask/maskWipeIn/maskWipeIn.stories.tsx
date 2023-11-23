import type { StoryFn } from '@storybook/react'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

import eases from '@/motion/eases/eases'

import { BaseImage } from '@/components/BaseImage'

import maskWipeIn from './maskWipeIn'

export default { title: 'motion/Effects/mask/maskWipeIn' }

gsap.registerEffect(maskWipeIn)

export const Default: StoryFn = (args) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeline = gsap.timeline()
    const el = ref.current
    if (el) timeline.maskWipeIn(el!, args, 0.4)
    return () => {
      timeline.kill()
    }
  }, [args])

  return (
    <div ref={ref}>
      <BaseImage data={require('@/assets/images/test.png').default} />
    </div>
  )
}

Default.args = {
  ...maskWipeIn.defaults,
  duration: 1
}

Default.argTypes = {
  ease: { options: eases.map((e) => e.name), control: { type: 'select' } },
  direction: { options: ['left', 'right', 'up', 'down'], control: { type: 'select' } }
}
