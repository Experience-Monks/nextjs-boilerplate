import { FC, memo, useEffect, useState } from 'react';
import { device } from '@jam3/detect';
import classNames from 'classnames';

import css from './RotateScreen.module.scss';

import resize from '@/services/resize';

export interface RotateScreenProps {
  className?: string;
}

const RotateScreen: FC<RotateScreenProps> = ({ className }) => {
  const [enable, setEnable] = useState(process.env.STORYBOOK || (device.phone && device.landscape));

  useEffect(() => {
    const handleResize = () => {
      setEnable(device.phone && device.landscape);
    };

    resize.listen(handleResize);

    return () => {
      resize.dismiss(handleResize);
    };
  }, []);

  return (
    <div className={classNames('RotateScreen', css.root, className, { [css.enabled]: enable })}>Rotate Screen</div>
  );
};

export default memo(RotateScreen);
