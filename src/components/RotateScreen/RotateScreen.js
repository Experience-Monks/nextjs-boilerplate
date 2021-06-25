import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';
import { useOrientation } from 'react-use';

import styles from './RotateScreen.module.scss';

import { device } from '../../utils/detect';

function RotateScreen({ className }) {
  const orientation = useOrientation();

  return (
    <div
      className={classnames(
        styles.RotateScreen,
        { [styles.enabled]: device.phone && orientation.angle !== 0 },
        className
      )}
    >
      Rotate Screen
    </div>
  );
}

RotateScreen.propTypes = checkProps({
  className: PropTypes.string
});

RotateScreen.defaultProps = {};

export default memo(RotateScreen);
