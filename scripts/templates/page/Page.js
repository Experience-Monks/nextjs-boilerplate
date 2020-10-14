import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';

import styles from './index.module.scss';

import Head from '../../components/Head/Head';

function {{name}}({ className }) {
  return (
    <main className={classnames(styles.{{name}}, className)}>
      <Head title="{{name}}" />

      <h1>{{name}} Page</h1>
    </main>
  );
}

{{name}}.propTypes = checkProps({
  className: PropTypes.string
});

{{name}}.defaultProps = {};

export default memo({{name}});
