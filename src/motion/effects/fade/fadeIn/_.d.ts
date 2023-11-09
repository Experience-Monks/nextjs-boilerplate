interface CustomEffects {
  fadeIn: CustomEffect<
    { duration: number; reversed: boolean; delay: number; stagger: number; ease: string },
    gsap.TweenTarget
  >
}
