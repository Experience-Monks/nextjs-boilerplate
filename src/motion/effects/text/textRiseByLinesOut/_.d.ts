interface CustomEffects {
  textRiseByLinesOut: CustomEffect<{
    duration: number
    reversed: boolean
    lineDuration: number
    lineOffset: number
    ease: string | gsap.EaseFunction
  }>
}
