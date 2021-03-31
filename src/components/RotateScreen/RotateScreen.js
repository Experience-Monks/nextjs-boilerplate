import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useOrientation } from 'react-use';

import styles from './RotateScreen.module.scss';

import detect from '../../utils/detect';

function RotateScreen({ className }) {
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

RotateScreen.propTypes = {
  className: PropTypes.string
};

RotateScreen.defaultProps = {};

export default memo(RotateScreen);
