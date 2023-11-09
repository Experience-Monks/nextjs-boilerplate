interface CustomEffects {
  textRiseByWordsOut: CustomEffect<{
    duration: number
    reversed: boolean
    wordDuration: number
    wordOffset: number
    ease: string | gsap.EaseFunction
  }>
}
