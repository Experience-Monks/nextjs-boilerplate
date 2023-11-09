interface CustomEffects {
  textFadeByCharsIn: CustomEffect<{
    immediateRender: boolean
    duration: number
    reversed: boolean
    charDuration: number
    charOffset: number
    shuffle: boolean
    ease: string | gsap.EaseFunction
  }>
}
