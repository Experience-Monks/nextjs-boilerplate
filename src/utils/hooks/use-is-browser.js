import { useState, useEffect } from 'react';

import { device } from '../detect';

function useIsBrowser() {
  const [current, setCurrent] = useState(false); // ssr

  useEffect(() => {
    setCurrent(device.browser);
  }, [current]);

  return current;
}

export default useIsBrowser;
