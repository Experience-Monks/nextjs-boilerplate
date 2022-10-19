import gsap from 'gsap';

import effectTimeline from '@/utils/effect-timeline';
import SafeSplitText from '@/utils/safe-split-text';

const effect: CustomEffectConfig = {
  name: 'textFadeByWordsOut',
  effect: (target, config = {}) => {
    return effectTimeline(config.duration!, config.reversed!, () => {
      const element = (target as unknown as HTMLElement[])[0];
      const split = new SafeSplitText(element, { type: 'lines,words' });
      const words = config.shuffle ? gsap.utils.shuffle(split.words) : split.words;
      return gsap //
        .timeline({ paused: true })
        .to(words, {
          opacity: 0,
          duration: config.wordDuration,
          stagger: config.wordOffset,
          ease: config.ease
        });
    });
  },
  defaults: {
    duration: 1,
    wordDuration: 1,
    wordOffset: 0.2,
    shuffle: false,
    ease: 'none'
  },
  extendTimeline: true
};

export default effect;
