type ScrollListener = (e?: Event) => void;

class ScrollService {
  listeners: ScrollListener[] = [];

  onScroll = (e: Event) => {
    this.listeners.forEach((listener) => listener(e));
  };

  listen = (listener: ScrollListener) => {
    if (!this.listeners.length) {
      window.addEventListener('scroll', this.onScroll, { passive: false });
    }
    if (!this.listeners.includes(listener)) this.listeners.push(listener);
  };

  dismiss = (listener: ScrollListener) => {
    this.listeners = this.listeners.filter((l) => l !== listener);
    if (!this.listeners.length) {
      window.removeEventListener('scroll', this.onScroll);
    }
  };
}

export default new ScrollService();
