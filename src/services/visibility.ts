type VisibilityListener = (e?: Event) => void;

class VisibilityService {
  listeners: VisibilityListener[] = [];

  onVisibility = (e: Event) => {
    this.listeners.map((listener) => listener(e));
  };

  add = (listener: VisibilityListener) => {
    if (!this.listeners.length) {
      document.addEventListener('visibilitychange', this.onVisibility);
    }
    if (!this.listeners.includes(listener)) this.listeners.push(listener);
  };

  remove = (listener: VisibilityListener) => {
    this.listeners = this.listeners.filter((l) => l !== listener);
    if (!this.listeners.length) {
      document.removeEventListener('visibilitychange', this.onVisibility);
    }
  };
}

export default new VisibilityService();
