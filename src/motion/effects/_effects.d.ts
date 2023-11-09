type CustomEffect<Config, Target = Element> = (
  target: Target,
  config?: Partial<Config>,
  position?: gsap.Position
) => gsap.core.Timeline

type CustomEffectConfig = {
  [EffectName in keyof CustomEffects]: {
    name: EffectName
    effect: CustomEffects[EffectName]
    defaults?: Parameters<CustomEffects[EffectName]>[1]
    extendTimeline?: boolean
  }
}[keyof CustomEffects]

declare namespace gsap {
  interface EffectsMap extends CustomEffects {}

  namespace core {
    interface Timeline extends CustomEffects {}
  }

  // overload the defaults function based on our config
  // our config for defaults can be found in `init-gsap.ts`
  function defaults(): { ease: EaseFunction; duration: number }
}
