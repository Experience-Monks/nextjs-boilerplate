import { device } from '@jam3/detect';

type ResizeListener = (e?: Event | UIEvent) => void;

class ResizeService {
  listeners: ResizeListener[] = [];

  onResize = (e: Event | UIEvent) => {
    setTimeout(
      () => {
        this.listeners.forEach((listener) => listener(e));
      },
      device.mobile ? 500 : 0 // some mobile browsers only update window dimensions when the rotate animation finishes
    );
  };

  listen = (listener: ResizeListener) => {
    if (!this.listeners.length) {
      window.addEventListener(device.mobile ? 'orientationchange' : 'resize', this.onResize);
    }
    if (!this.listeners.includes(listener)) this.listeners.push(listener);
  };

  dismiss = (listener: ResizeListener) => {
    this.listeners = this.listeners.filter((l) => l !== listener);
    if (!this.listeners.length) {
      window.removeEventListener(device.mobile ? 'orientationchange' : 'resize', this.onResize);
    }
  };
}

export default new ResizeService();
