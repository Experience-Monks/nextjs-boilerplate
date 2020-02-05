window.dataLayer = window.dataLayer || [];

/**
 * Dispatch an event with GTM
 *
 * @param {boolean} [action=false] - Action name
 * @param {any} [payload={}] - Action data
 */
function gtmEvent(action = false, payload = {}) {
  if (action) {
    window.dataLayer.push({
      event: action,
      payload
    });
  }
}

export default gtmEvent;
