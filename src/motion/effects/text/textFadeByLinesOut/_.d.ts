interface CustomEffects {
  textFadeByLinesOut: CustomEffect<{
    duration: number
    reversed: boolean
    lineDuration: number
    lineOffset: number
    shuffle: boolean
    ease: string | gsap.EaseFunction
  }>
}
