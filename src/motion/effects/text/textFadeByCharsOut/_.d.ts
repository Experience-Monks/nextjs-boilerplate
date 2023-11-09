interface CustomEffects {
  textFadeByCharsOut: CustomEffect<{
    duration: number
    reversed: boolean
    charDuration: number
    charOffset: number
    shuffle: boolean
    ease: string | gsap.EaseFunction
  }>
}
