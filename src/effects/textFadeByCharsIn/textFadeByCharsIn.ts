import gsap from 'gsap';

import effectTimeline from '@/utils/effect-timeline';
import SafeSplitText from '@/utils/safe-split-text';

const setup = (target: Element): [element: HTMLElement, split: SafeSplitText] => {
  const element = (target as unknown as HTMLElement[])[0];
  const split = new SafeSplitText(element, { type: 'words,chars' });
  gsap.set(split.words, { opacity: 0 });
  return [element, split];
};

const effect: CustomEffectConfig = {
  name: 'textFadeByCharsIn',
  effect: (target, config = {}) => {
    if (config.immediateRender) setup(target);

    return effectTimeline(config.duration!, config.reversed!, () => {
      const [element, split] = setup(target);
      const chars = config.shuffle ? gsap.utils.shuffle(split.chars) : split.chars;
      return gsap
        .timeline({ paused: true })
        .set(element, { opacity: 1 })
        .set(split.words, { opacity: 1 })
        .set(chars, { opacity: 0 })
        .to(chars, {
          opacity: 1,
          duration: config.charDuration,
          stagger: config.charOffset,
          ease: config.ease
        });
    });
  },
  defaults: {
    duration: gsap.defaults().duration as number,
    charDuration: 1,
    charOffset: 0.1,
    shuffle: false,
    ease: 'none',
    immediateRender: false
  },
  extendTimeline: true
};

export default effect;
