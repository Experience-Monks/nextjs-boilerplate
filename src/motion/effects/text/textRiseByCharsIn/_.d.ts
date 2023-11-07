interface CustomEffects {
  textRiseByCharsIn: CustomEffect<{
    immediateRender: boolean
    duration: number
    reversed: boolean
    charDuration: number
    charOffset: number
    ease: string | gsap.EaseFunction
  }>
}
