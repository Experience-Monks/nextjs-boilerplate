/*
  For every effect that gets registered with GSAP, in order to help TypeScript work with it,
  we need to add a line within the `EffectsMap` interface, in the following format:
  `effectName: CallEffect<{ ... effect config types ... }>;`
*/

declare namespace gsap {
  interface EffectsMap {
    fadeIn: CallEffect<{ duration: number; y: number; delay: number; stagger: number }>;
  }

  /*
    Things below are just utils to make the above work,
    ignore them if you're just trying to register a new effect.
  */

  type CallEffect<Config> = (targets: TweenTarget, config: Partial<Config>) => core.Tween;

  type EffectConfigMap = {
    [EffectName in keyof EffectsMap as string extends EffectName ? never : EffectName]: Parameters<
      EffectsMap[EffectName]
    >[1];
  };

  type RegisterEffect = (
    effect: {
      [EffectName in keyof EffectConfigMap]: {
        name: EffectName;
        effect: EffectsMap[EffectName];
        defaults: Required<EffectConfigMap[EffectName]>;
        extendTimeline?: boolean;
      };
    }[keyof EffectConfigMap]
  ) => void;
}
