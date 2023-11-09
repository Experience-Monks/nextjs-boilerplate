interface CustomEffects {
  textFadeByLinesIn: CustomEffect<{
    immediateRender: boolean
    duration: number
    reversed: boolean
    lineDuration: number
    lineOffset: number
    shuffle: boolean
    ease: string | gsap.EaseFunction
  }>
}
