import gsap from 'gsap';

import effectTimeline from '@/utils/effect-timeline';
import SafeSplitText from '@/utils/safe-split-text';

const setup = (target: Element): [element: HTMLElement, split: SafeSplitText] => {
  const element = (target as unknown as HTMLElement[])[0];
  const split = new SafeSplitText(element, { type: 'lines,words' });
  gsap.set(split.lines, { opacity: 0 });
  return [element, split];
};

const effect: CustomEffectConfig = {
  name: 'textRiseByWordsIn',
  effect: (target, config = {}) => {
    if (config.immediateRender) setup(target);

    return effectTimeline(config.duration!, config.reversed!, () => {
      const [element, split] = setup(target);
      return gsap
        .timeline({ paused: true })
        .set(element, { opacity: 1 })
        .set(split.lines, { opacity: 1 })
        .set(split.words, { yPercent: 105 })
        .set(split.lines, { overflow: 'hidden' })
        .to(split.words, {
          yPercent: 0,
          duration: config.wordOffset,
          stagger: config.wordOffset,
          ease: config.ease
        });
    });
  },
  defaults: {
    duration: gsap.defaults().duration as number,
    wordDuration: 1,
    wordOffset: 0.1,
    ease: 'expo.out',
    immediateRender: false
  },
  extendTimeline: true
};

export default effect;
