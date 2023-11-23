import { gsap } from 'gsap'

import { noop } from './basic-functions'

interface ScrollProps {
  x: number
  y: number
  duration: number
  ease: string
}

const defaultProps: ScrollProps = {
  x: 0,
  y: 0,
  duration: 0, // in seconds
  ease: 'none'
}

let timeoutId: NodeJS.Timeout

/**
 * Scroll page to a specific position
 *
 * @param {object} [props={}] - Scroll options. Refer to 'defaultProps' object
 * @param {function} [onComplete=noop] - On complete trigger function
 */
export function scrollPage(props: Partial<ScrollProps> = {}, onComplete = noop) {
  const combinedProps = { ...defaultProps, ...props }
  const { x, y, duration, ease } = combinedProps

  if (timeoutId) clearTimeout(timeoutId)
  timeoutId = setTimeout(onComplete, duration * 1000)

  gsap.to(window, { duration, scrollTo: { x, y, autoKill: false }, ease })
}
