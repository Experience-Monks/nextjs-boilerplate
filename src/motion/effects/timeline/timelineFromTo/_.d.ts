interface CustomEffects {
  timelineFromTo: CustomEffect<
    {
      duration: number
      reversed: boolean
      from: number
      to: number
      ease: string | gsap.EaseFunction
    },
    gsap.core.Timeline | (() => gsap.core.Timeline)
  >
}
