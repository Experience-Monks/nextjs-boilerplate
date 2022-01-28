import gsap from 'gsap';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

function gsapInit() {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
  gsap.defaults({ ease: 'power2.out', duration: 0.333 });
  gsap.config({ nullTargetWarn: false });

  gsap.registerEffect({
    name: 'fadeIn',
    extendTimeline: true,
    effect: (targets: gsap.TweenTarget, config: { duration: number; y: number; delay: number; stagger: number }) => {
      return gsap.from(targets, {
        duration: config.duration,
        autoAlpha: 0,
        y: config.y,
        delay: config.delay,
        stagger: config.stagger
      });
    },
    defaults: { duration: 0.667, y: 20, delay: 0, stagger: 0 }
  });
}

export default gsapInit;
