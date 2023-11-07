interface CustomEffects {
  textRiseByLinesIn: CustomEffect<{
    revertOnComplete: boolean
    immediateRender: boolean
    duration: number
    reversed: boolean
    lineDuration: number
    lineOffset: number
    ease: string | gsap.EaseFunction
  }>
}
