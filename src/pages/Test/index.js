import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';
import Head from 'next/head';

import styles from './Test.module.scss';

function Test() {
  return (
    <section className={classnames(styles.Test)}>
      <Head>
        <title>Test | Jam3 generator</title>
      </Head>

      <section>Test Page</section>
    </section>
  );
}

Test.propTypes = checkProps({});

Test.defaultProps = {};

export default memo(Test);
