import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';
import { useOrientation } from 'react-use';

import styles from './RotateScreen.module.scss';
import detect, { isBrowser } from '../../utils/detect';

const ROTATE_TYPES = {
  PORTRAIT: 'portrait-primary',
  LANDSCAPE: 'landscape-primary'
};

function RotateScreen({ className }) {
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

RotateScreen.propTypes = checkProps({
  className: PropTypes.string
});

RotateScreen.defaultProps = {};

export default memo(RotateScreen);
