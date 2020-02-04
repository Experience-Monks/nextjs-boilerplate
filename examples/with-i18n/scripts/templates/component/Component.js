import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';

import styles from './{{name}}.module.scss';

function {{name}}() {
  return (
    <div className={classnames(styles.{{name}})}>
      {{name}} component
    </div>
  );
};

{{name}}.propTypes = checkProps({});

{{name}}.defaultProps = {};

export default memo({{name}});
