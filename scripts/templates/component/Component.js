import React, { memo } from 'react';
import classnames from 'classnames';

import styles from './{{name}}.module.scss';

type Props = { ... };

function {{name}}() {
  return <div className={classnames(styles.{{name}})}>{{name}} component</div>;
}

{{name}}.defaultProps = ({}: Props);

export default (memo({{name}}): React$AbstractComponent<Props, any>);
