import noop from 'no-op';
import { gsap } from 'gsap';

const defaultProps = {
  x: 0,
  y: 0,
  duration: 0, // in seconds
  ease: 'none'
};

let timeoutId;

/**
 * Scroll page to a specific position
 *
 * @param {object} [props={}] - Scroll options. Refer to 'defaultProps' object
 * @param {function} [onComplete=noop] - On complete trigger function
 */
export default function scrollPage(props = {}, onComplete = noop) {
  const combinedProps = Object.assign({}, defaultProps, props);
  const { x, y, duration, ease } = combinedProps;

  timeoutId && clearTimeout(timeoutId);
  timeoutId = setTimeout(onComplete, duration * 1000);

  gsap.to(window, duration, {
    scrollTo: { x, y, autoKill: false, ease }
  });
}
