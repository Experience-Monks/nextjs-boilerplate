interface CustomEffects {
  maskWipeOut: CustomEffect<{
    direction: 'left' | 'right' | 'up' | 'down'
    duration: number
    reversed: boolean
    stagger: number
    offset: number
    ease: string | gsap.EaseFunction
  }>
}
