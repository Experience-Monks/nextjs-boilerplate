import gsap from 'gsap';

import effectTimeline from '@/utils/effect-timeline';
import SafeSplitText from '@/utils/safe-split-text';

const effect: CustomEffectConfig = {
  name: 'textFadeByLinesOut',
  effect: (target, config = {}) => {
    return effectTimeline(config.duration!, config.reversed!, () => {
      const element = (target as unknown as HTMLElement[])[0];
      const split = new SafeSplitText(element, { type: 'lines' });
      const lines = config.shuffle ? gsap.utils.shuffle(split.lines) : split.lines;
      return gsap //
        .timeline({ paused: true })
        .to(lines, {
          opacity: 0,
          duration: config.lineDuration,
          stagger: config.lineOffset,
          ease: config.ease
        });
    });
  },
  defaults: {
    duration: 1,
    lineDuration: 1,
    lineOffset: 0.2,
    shuffle: false,
    ease: 'none'
  },
  extendTimeline: true
};

export default effect;
