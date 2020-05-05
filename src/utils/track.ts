declare var dataLayer: any[];

dataLayer = dataLayer || [];

/**
 * Dispatch an event with GTM
 */
function gtmEvent(action: string, payload = {}) {
  if (action) {
    dataLayer.push({
      event: action,
      payload
    });
  }
}
export default gtmEvent;
