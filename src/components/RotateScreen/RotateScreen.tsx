import { memo } from 'react';
import classnames from 'classnames';
import { useOrientation } from 'react-use';

import styles from './RotateScreen.module.scss';

import detect from '../../utils/detect';

export type Props = {
  className?: string;
};

function RotateScreen({ className }: Props) {
  const orientation = useOrientation();

  return (
    <div
      className={classnames(
        styles.RotateScreen,
        { [styles.enabled]: detect.device.isPhone && orientation.angle !== 0 },
        className
      )}
    >
      Rotate Screen
    </div>
  );
}

export default memo(RotateScreen);
