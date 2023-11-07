interface CustomEffects {
  textRiseFadeByLinesIn: CustomEffect<{
    immediateRender: boolean
    duration: number
    reversed: boolean
    lineDuration: number
    lineOffset: number
    ease: string | gsap.EaseFunction
    y: string | number
  }>
}
