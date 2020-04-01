import React, { memo } from 'react';
import classnames from 'classnames';
import { useOrientation } from 'react-use';

import styles from './RotateScreen.module.scss';

import detect, { isBrowser } from '../../utils/detect';

type Props = {
  className?: string
};

const ROTATE_TYPES = {
  PORTRAIT: 'portrait-primary',
  LANDSCAPE: 'landscape-primary'
};

function RotateScreen({ className }: Props) {
  const orientation = useOrientation();

  return (
    <div
      className={classnames(
        styles.RotateScreen,
        { [styles.enabled]: isBrowser && !detect.device?.isDesktop && orientation.type === ROTATE_TYPES.LANDSCAPE },
        className
      )}
    >
      RotateScreen
    </div>
  );
}

export default (memo(RotateScreen): React$AbstractComponent<Props, any>);
