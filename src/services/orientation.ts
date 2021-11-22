type OrientationListener = (e?: Event) => void;

class OrientationService {
  listeners: OrientationListener[] = [];

  onOrientation = (e: Event) => {
    this.listeners.forEach((listener) => listener(e));
  };

  listen = (listener: OrientationListener) => {
    if (!this.listeners.length) {
      window.addEventListener('orientationchange', this.onOrientation);
    }
    if (!this.listeners.includes(listener)) this.listeners.push(listener);
  };

  dismiss = (listener: OrientationListener) => {
    this.listeners = this.listeners.filter((l) => l !== listener);
    if (!this.listeners.length) {
      window.removeEventListener('orientationchange', this.onOrientation);
    }
  };
}

export default new OrientationService();
