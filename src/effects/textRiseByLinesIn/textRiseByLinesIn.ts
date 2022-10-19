import gsap from 'gsap';

import effectTimeline from '@/utils/effect-timeline';
import SafeSplitText from '@/utils/safe-split-text';

const setup = (target: Element): [element: HTMLElement, split1: SafeSplitText, split2: SafeSplitText] => {
  const element = (target as unknown as HTMLElement[])[0];
  const split1 = new SafeSplitText(element, { type: 'lines' });
  const split2 = new SafeSplitText(split1.lines, { type: 'lines' });
  gsap.set(split1.lines, { opacity: 0 });
  return [element, split1, split2];
};

const effect: CustomEffectConfig = {
  name: 'textRiseByLinesIn',
  effect: (target, config = {}) => {
    if (config.immediateRender) setup(target);

    return effectTimeline(config.duration!, config.reversed!, () => {
      const [element, split1, split2] = setup(target);
      return gsap
        .timeline({ paused: true })
        .set(element, { opacity: 1 })
        .set(split1.lines, { opacity: 1 })
        .set(split2.lines, { yPercent: 105 })
        .set(split1.lines, { overflow: 'hidden' })
        .to(split2.lines, {
          yPercent: 0,
          duration: config.lineDuration,
          stagger: config.lineOffset,
          ease: config.ease
        });
    });
  },
  defaults: {
    duration: gsap.defaults().duration as number,
    lineDuration: 1,
    lineOffset: 0.1,
    ease: 'expo.out',
    immediateRender: false
  },
  extendTimeline: true
};

export default effect;
