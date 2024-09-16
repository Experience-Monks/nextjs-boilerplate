import type { StoryFn } from '@storybook/react'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

import { copy } from '@/utils/copy'

import { easeNames } from '@/motion/eases/eases'

import textFadeByCharsOut from './textFadeByCharsOut'

export default { title: 'motion/Effects/text/textFadeByCharsOut' }

gsap.registerEffect(textFadeByCharsOut)

export const Default: StoryFn = ({ content, ...args }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeline = gsap.timeline()
    const el = ref.current
    if (el) timeline.textFadeByCharsOut(el!, args, 0.4)
    return () => {
      timeline.kill()
      if (el) gsap.set(el, { opacity: 1 })
    }
  }, [args])

  return <div ref={ref} style={{ fontSize: '4rem', opacity: 1 }} {...copy.html(content)} />
}

Default.args = {
  ...textFadeByCharsOut.defaults,
  duration: 1,
  content: "The relentless pursuit of better.\nWe create modern experiences\nfor tomorrow's brands."
}

Default.argTypes = {
  ease: { options: easeNames, control: { type: 'select' } }
}
