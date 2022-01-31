import gsap from 'gsap';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

function gsapInit() {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
  gsap.defaults({ ease: 'power2.out', duration: 0.333 });
  gsap.config({ nullTargetWarn: false });
}

export default gsapInit;
