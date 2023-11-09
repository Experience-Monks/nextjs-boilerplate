interface CustomEffects {
  textFadeByWordsOut: CustomEffect<{
    duration: number
    reversed: boolean
    wordDuration: number
    wordOffset: number
    shuffle: boolean
    ease: string | gsap.EaseFunction
  }>
}
