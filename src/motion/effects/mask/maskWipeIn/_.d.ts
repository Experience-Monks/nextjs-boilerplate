interface CustomEffects {
  maskWipeIn: CustomEffect<{
    immediateRender: boolean
    direction: 'left' | 'right' | 'up' | 'down'
    duration: number
    reversed: boolean
    stagger: number
    offset: number
    ease: string | gsap.EaseFunction
  }>
}
