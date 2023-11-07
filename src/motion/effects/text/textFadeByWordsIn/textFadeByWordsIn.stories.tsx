import { useEffect, useRef } from 'react'
import { StoryFn } from '@storybook/react'
import { gsap } from 'gsap'

import copy from '@/utils/copy'

import eases from '@/motion/eases/eases'

import textFadeByWordsIn from './textFadeByWordsIn'

export default { title: 'motion/effects/text/textFadeByWordsIn' }

gsap.registerEffect(textFadeByWordsIn)

export const Default: StoryFn = ({ content, ...args }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeline = gsap.timeline()
    const el = ref.current
    if (el) timeline.textFadeByWordsIn(el!, args, 0.4)
    return () => {
      timeline.kill()
      if (el) gsap.set(el, { opacity: 0 })
    }
  }, [args])

  return <div ref={ref} style={{ fontSize: '4rem', opacity: 0 }} {...copy.html(content)} />
}

Default.args = {
  ...textFadeByWordsIn.defaults,
  duration: 1,
  content: "The relentless pursuit of better.\nWe create modern experiences\nfor tomorrow's brands."
}

Default.argTypes = {
  ease: { options: eases.map((e) => e.name), control: { type: 'select' } }
}
