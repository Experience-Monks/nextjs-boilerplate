type RAFListener = (delta?: number) => void;

class RAFService {
  listeners: RAFListener[] = [];
  frameId = 0;
  elapsed = 0;

  onFrame = () => {
    const now = Date.now();
    const delta = now - this.elapsed;
    this.elapsed = now;
    this.listeners.map((listener) => listener(delta));
    this.frameId = requestAnimationFrame(this.onFrame);
  };

  listen = (listener: RAFListener) => {
    if (!this.listeners.includes(listener)) this.listeners.push(listener);
    if (!this.frameId) {
      this.elapsed = Date.now();
      this.frameId = requestAnimationFrame(this.onFrame);
    }
  };

  dismiss = (listener: RAFListener) => {
    this.listeners = this.listeners.filter((l) => l !== listener);
    if (!this.listeners.length) {
      cancelAnimationFrame(this.frameId);
      this.frameId = 0;
    }
  };
}

export default new RAFService();
