import gsap from 'gsap';
import CustomEase from 'gsap/dist/CustomEase';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';

function initGsap() {
  gsap.registerPlugin(CustomEase, ScrollToPlugin);

  gsap.defaults({ ease: 'power2.out', duration: 0.333 });

  // Add your custom eases here. Example:
  // CustomEase.create('ease01', '0.33, 0, 0, 1');

  // Enable only the effects you need. Each effect will register their own
  // GSAP plugins. All effects will be enabled on Storybook environment for testing.
  if (!process.env.STORYBOOK) {
    gsap.registerEffect(require('@/effects/fadeFrom/fadeFrom').default);
  }
}

export default initGsap;
