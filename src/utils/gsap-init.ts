import gsap from 'gsap';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

const registerEffect: gsap.RegisterEffect = gsap.registerEffect;

function gsapInit() {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
  gsap.defaults({ ease: 'power2.out', duration: 0.333 });
  gsap.config({ nullTargetWarn: false });

  registerEffect({
    name: 'fadeIn',
    extendTimeline: true,
    effect: (targets, config) => {
      return gsap.from(targets, {
        duration: config.duration,
        opacity: 0,
        y: config.y,
        delay: config.delay,
        stagger: config.stagger
      });
    },
    defaults: { duration: 0.667, y: 20, delay: 0, stagger: 0 }
  });
}

export default gsapInit;
