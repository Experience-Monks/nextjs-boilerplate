import { memo } from 'react';
import classnames from 'classnames';

import styles from './Embedded.module.scss';

export type Props = {
  className?: string;
  link?: string;
  title?: string;
};

function Embedded({ className, link, title }: Props) {
  return (
    <div className={classnames(styles.Embedded, className)}>
      <h3 className={styles.title}>{title}</h3>
      <a className={styles.link} href={link}>
        Open Embedded
      </a>
      <iframe className={styles.iframe} title="iframe" src={link} frameBorder="0"></iframe>
    </div>
  );
}

export default memo(Embedded);
