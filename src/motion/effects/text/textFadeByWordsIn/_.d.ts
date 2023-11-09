interface CustomEffects {
  textFadeByWordsIn: CustomEffect<{
    immediateRender: boolean
    duration: number
    reversed: boolean
    wordDuration: number
    wordOffset: number
    shuffle: boolean
    ease: string | gsap.EaseFunction
  }>
}
