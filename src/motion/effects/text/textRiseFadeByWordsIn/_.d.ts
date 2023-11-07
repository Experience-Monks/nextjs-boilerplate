interface CustomEffects {
  textRiseFadeByWordsIn: CustomEffect<{
    immediateRender: boolean
    duration: number
    reversed: boolean
    wordDuration: number
    wordOffset: number
    ease: string | gsap.EaseFunction
    y: string | number
  }>
}
