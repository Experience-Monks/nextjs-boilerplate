interface CustomEffects {
  textRiseByCharsOut: CustomEffect<{
    duration: number
    reversed: boolean
    charDuration: number
    charOffset: number
    ease: string | gsap.EaseFunction
  }>
}
