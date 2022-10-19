interface CustomEffects {
  textRiseByLinesIn: CustomEffect<{
    immediateRender: boolean;
    duration: number;
    reversed: boolean;
    lineDuration: number;
    lineOffset: number;
    ease: string | gsap.EaseFunction;
  }>;
}
