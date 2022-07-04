import { device } from '@jam3/detect';

import { resizeDebounceTime } from '@/data/settings';

type ResizeListener = (e?: Event | UIEvent) => void;

let timeout: NodeJS.Timeout;
class Service {
  listeners: ResizeListener[] = [];

  onResize = (e: Event | UIEvent) => {
    clearTimeout(timeout);

    timeout = setTimeout(
      () => {
        this.listeners.forEach((listener) => listener(e));
      },
      device.mobile ? 500 : resizeDebounceTime // some mobile browsers only update window dimensions when the rotate animation finishes
    );
  };

  listen = (listener: ResizeListener) => {
    if (!this.listeners.length) {
      window.addEventListener('resize', this.onResize);

      if (device.mobile) {
        window.addEventListener('orientationchange', this.onResize);
      }
    }

    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener);
    }
  };

  dismiss = (listener: ResizeListener) => {
    this.listeners = this.listeners.filter((l) => l !== listener);

    if (!this.listeners.length) {
      window.removeEventListener('resize', this.onResize);

      if (device.mobile) {
        window.removeEventListener('orientationchange', this.onResize);
      }
    }
  };
}

const ResizeService = new Service();

export default ResizeService;
