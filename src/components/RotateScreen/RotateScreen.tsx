import { memo, useEffect, useState } from 'react';
import classnames from 'classnames';
import { device } from '@jam3/detect';

import styles from './RotateScreen.module.scss';

import resize from '@/services/resize';

export type Props = {
  className?: string;
};

function RotateScreen({ className }: Props) {
  const [enable, setEnable] = useState(device.phone && device.landscape);

  useEffect(() => {
    const handleResize = () => {
      setEnable(device.phone && device.landscape);
    };

    resize.listen(handleResize);

    return () => {
      resize.dismiss(handleResize);
    };
  }, []);

  return <div className={classnames(styles.RotateScreen, { [styles.enabled]: enable }, className)}>Rotate Screen</div>;
}

export default memo(RotateScreen);
