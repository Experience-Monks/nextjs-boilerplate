interface CustomEffects {
  textScrambleByLines: CustomEffect<{
    duration: number
    reversed: boolean
    offset: number
    text: string
    chars: string
    speed: number
    immediateRender: boolean
    wipe: {
      direction: 'left' | 'right'
      duration?: number
      ease?: string | gsap.EaseFunction
    }
  }>
}
