import React, { memo } from 'react';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';
import Head from 'next/head';

import styles from './{{name}}.module.scss';

import { withRedux } from '../redux/withRedux';

function {{name}}() {
  return (
    <section className={classnames(styles.{{name}})}>
      <Head>
        <title>{{name}} | Jam3 generator</title>
      </Head>

      <section>{{name}} Page</section>
    </section>
  );
};

export default withRedux({{name}});
