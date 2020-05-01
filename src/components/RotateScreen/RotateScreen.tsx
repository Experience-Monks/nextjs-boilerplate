import React, { memo } from 'react';
import classnames from 'classnames';
import { useOrientation } from 'react-use';

import styles from './RotateScreen.module.scss';
import detect, { isBrowser } from '../../utils/detect';

const ROTATE_TYPES = {
  PORTRAIT: 'portrait-primary',
  LANDSCAPE: 'landscape-primary'
};

function RotateScreen({ className }: { className?: string }) {
  const orientation = useOrientation();

  return (
    <div
      className={classnames(
        styles.RotateScreen,
        { [styles.enabled]: isBrowser && !detect.device.isDesktop && orientation.type === ROTATE_TYPES.LANDSCAPE },
        className
      )}
    >
      RotateScreen
    </div>
  );
}

RotateScreen.defaultProps = {};

export default memo(RotateScreen);
