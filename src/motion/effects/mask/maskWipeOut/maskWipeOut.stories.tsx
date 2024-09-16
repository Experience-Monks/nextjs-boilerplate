import type { StoryFn } from '@storybook/react'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

import { easeNames } from '@/motion/eases/eases'

import { BaseImage } from '@/components/BaseImage'

import maskWipeOut from './maskWipeOut'

export default { title: 'motion/Effects/mask/maskWipeOut' }

gsap.registerEffect(maskWipeOut)

export const Default: StoryFn = (args) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeline = gsap.timeline()
    const el = ref.current
    if (el) timeline.maskWipeOut(el!, args, 0.4)
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
  ...maskWipeOut.defaults,
  duration: 1
}

Default.argTypes = {
  ease: { options: easeNames, control: { type: 'select' } },
  direction: { options: ['left', 'right', 'up', 'down'], control: { type: 'select' } }
}
