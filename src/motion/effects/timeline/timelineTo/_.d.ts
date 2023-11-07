interface CustomEffects {
  timelineTo: CustomEffect<
    {
      reversed: boolean
      duration: number
      ease: string | gsap.EaseFunction
      to: number
    },
    gsap.core.Timeline
  >
}
