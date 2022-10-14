import { useEffect, useState } from 'react';

import visibility from '@/services/visibility';

const useWindowVisible = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const update = (e: Event) => {
      if (e && e.type === 'blur') {
        setVisible(false);
      } else {
        setVisible(!document.hidden);
      }
    };

    visibility.listen(update);

    return () => {
      visibility.dismiss(update);
    };
  }, []);

  return visible;
};

export default useWindowVisible;
