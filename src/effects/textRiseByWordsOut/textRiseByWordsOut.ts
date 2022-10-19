import gsap from 'gsap';

import effectTimeline from '@/utils/effect-timeline';
import SafeSplitText from '@/utils/safe-split-text';

const effect: CustomEffectConfig = {
  name: 'textRiseByWordsOut',
  effect: (target, config = {}) => {
    return effectTimeline(config.duration!, config.reversed!, () => {
      const element = (target as unknown as HTMLElement[])[0];
      const split = new SafeSplitText(element, { type: 'lines,words' });
      return gsap //
        .timeline({ paused: true })
        .set(split.lines, { overflow: 'hidden' })
        .to(split.words, {
          yPercent: 105,
          duration: config.wordDuration,
          stagger: config.wordOffset,
          ease: config.ease
        });
    });
  },
  defaults: {
    duration: 1,
    wordDuration: 1,
    wordOffset: 0.1,
    ease: 'expo.in'
  },
  extendTimeline: true
};

export default effect;
