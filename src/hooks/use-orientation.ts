import { useEffect, useState } from 'react';
import { device } from '@jam3/detect';

import orientation from '@/services/orientation';
import resize from '@/services/resize';

function useOrientation(includeDesktop = false) {
  const [current, setCurrent] = useState({ portrait: true, landscape: false }); // ssr

  useEffect(() => {
    const update = () => {
      setCurrent({ landscape: device.landscape, portrait: !device.landscape });
    };

    if (device.mobile || includeDesktop) {
      update();
      if (includeDesktop) {
        resize.listen(update);
      } else {
        orientation.listen(update);
      }
    }

    return () => {
      resize.dismiss(update);
      orientation.dismiss(update);
    };
  }, [includeDesktop]);

  return current;
}

export default useOrientation;
