import { memo } from 'react';
import classnames from 'classnames';

import styles from './Table.module.scss';

import { LicenseTableChecklist, TableItem } from '../../types/ursusTypes';
import { CONSTANTS } from '../../utils/constants';

export type Props = {
  className?: string;
  title?: string;
  checklist?: LicenseTableChecklist[];
  list?: TableItem[];
};

function Table({ className, checklist, title, list }: Props) {
  return (
    <div className={classnames(styles.Table, className)}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>{title}</h2>
        {checklist && <LicenseStatus checklist={checklist} />}
      </div>
      <ul className={styles.list}>
        {list &&
          list.length > 0 &&
          list.map(({ name, link, text }: TableItem, i: number) => {
            return (
              <li key={i} className={styles.listItem}>
                <span className={styles.itemKey}>{name}: </span>
                {Boolean(link) ? (
                  <a href={link} className={styles.itemValueLink}>
                    {text ? text : link}
                  </a>
                ) : (
                  <span className={styles.itemValue}>{text}</span>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

const LicenseStatus = ({ checklist }: Props) => {
  let result = '';
  if (!!checklist && checklist.length > 0) {
    checklist.forEach((el) => {
      let status = Object.values(el)[0].status;
      if (status === CONSTANTS.ERROR || status === CONSTANTS.NEEDS_REVIEW) {
        result = CONSTANTS.NOT_READY;
      } else {
        result = CONSTANTS.COMPLETE;
      }
    });
  }
  return (
    <span className={classnames(styles.status, { [styles.complete]: result === CONSTANTS.COMPLETE })}>{result}</span>
  );
};

export default memo(Table);
