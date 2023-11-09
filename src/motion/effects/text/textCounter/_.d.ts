interface CustomEffects {
  textCounter: CustomEffect<{
    duration: number
    delay: number
    start: number
    end: number
    ease: string | gsap.EaseFunction
  }>
}
