interface CustomEffects {
  fadeFrom: CustomEffect<
    {
      duration: number;
      reversed: boolean;
      delay: number;
      stagger: number;
      ease: string | gsap.EaseFunction;
      x: number | string;
      y: number | string;
      marginTop: number | string;
      clearProps: string;
      immediateRender: boolean;
    },
    gsap.TweenTarget
  >;
}
