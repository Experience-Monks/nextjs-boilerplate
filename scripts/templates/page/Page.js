import React, { memo } from 'react';
import classnames from 'classnames';
import checkProps from '@jam3/react-check-extra-props';

import styles from './{{name}}.module.scss';

import Head from '../../components/Head/Head';

import { withRedux } from '../../redux/withRedux';

function {{name}}() {
  return (
    <section className={classnames(styles.{{name}})}>
      <Head title="{{name}}" />

      <section>{{name}} Page</section>
    </section>
  );
};

export default withRedux({{name}});
