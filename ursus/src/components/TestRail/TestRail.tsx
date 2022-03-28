import { memo } from 'react';
import classnames from 'classnames';

import styles from './TestRail.module.scss';

export type Props = {
  className?: string;
  title: string;
};

function TestRail({ className, title }: Props) {
  return (
    <div className={classnames(styles.TestRail, className)}>
      <h3 className={styles.title}>{title}</h3>
      <a className={styles.link} target="_blank" href="/testrail/testrail.pdf">
        Open Embedded
      </a>
      <iframe
        className={styles.iframe}
        title="dashboard"
        src="/testrail/testrail.pdf#toolbar=0"
        frameBorder="0"
      ></iframe>
    </div>
  );
}

export default memo(TestRail);
