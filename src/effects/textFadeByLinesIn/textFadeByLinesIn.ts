import gsap from 'gsap';

import effectTimeline from '@/utils/effect-timeline';
import SafeSplitText from '@/utils/safe-split-text';

const setup = (target: Element): [element: HTMLElement, split: SafeSplitText] => {
  const element = (target as unknown as HTMLElement[])[0];
  const split = new SafeSplitText(element, { type: 'lines' });
  gsap.set(split.lines, { opacity: 0 });
  return [element, split];
};

const effect: CustomEffectConfig = {
  name: 'textFadeByLinesIn',
  effect: (target, config = {}) => {
    if (config.immediateRender) setup(target);

    return effectTimeline(config.duration!, config.reversed!, () => {
      const [element, split] = setup(target);
      const lines = config.shuffle ? gsap.utils.shuffle(split.lines) : split.lines;
      return gsap //
        .timeline({ paused: true })
        .set(element, { opacity: 1 })
        .to(lines, {
          opacity: 1,
          duration: config.lineDuration,
          stagger: config.lineOffset,
          ease: config.ease
        });
    });
  },
  defaults: {
    duration: gsap.defaults().duration as number,
    lineDuration: 1,
    lineOffset: 0.2,
    shuffle: false,
    ease: 'none',
    immediateRender: false
  },
  extendTimeline: true
};

export default effect;
