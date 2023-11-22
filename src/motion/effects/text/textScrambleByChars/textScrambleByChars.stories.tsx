import type { StoryFn } from '@storybook/react'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

import { copy } from '@/utils/copy'

import { eases } from '@/motion/eases/eases'

import textScrambleByChars from './textScrambleByChars'

export default { title: 'motion/Effects/text/textScrambleByChars' }

gsap.registerEffect(textScrambleByChars)

export const Default: StoryFn = ({ content, ...args }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeline = gsap.timeline()
    const el = ref.current
    if (el) timeline.textScrambleByChars(el!, args, 0.4)
    return () => {
      timeline.kill()
    }
  }, [args])

  return <div ref={ref} style={{ fontSize: '4rem' }} {...copy.html(content)} />
}

Default.args = {
  ...textScrambleByChars.defaults,
  duration: 2,
  content: "The relentless pursuit of better.\nWe create modern experiences\nfor tomorrow's brands."
}

Default.argTypes = {
  ease: { options: eases.map((e) => e.name), control: { type: 'select' } }
}
