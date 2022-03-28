import classnames from 'classnames';

import styles from './Checklist.module.scss';

import Accordion from './../../components/Accordion/Accordion';

import { ChecklistItem } from './../../types/ursusTypes';

import LinkLogo from '@/components/svgs/link.svg';

export type Props = {
  className?: string;
  list: ChecklistItem[];
};

function Checklist({ className, list }: Props) {
  const totalListNumber = list.length;
  const count = list.filter((el) => el.done).length;

  return (
    <div className={classnames(styles.Checklist, className)}>
      <Accordion title={'Checklist'} count={count} totalListNumber={totalListNumber}>
        <ul className={styles.list}>
          {list.map(({ name, reference, done }, index) => {
            return (
              <li key={index} className={styles.listItem}>
                <label className={styles.container}>
                  <span className={styles.itemName}>
                    {name}
                    <a href={reference}>
                      <LinkLogo className={styles.linkIcon} />
                    </a>
                  </span>
                  <input
                    readOnly={true}
                    className={styles.checkbox}
                    type="checkbox"
                    id={name}
                    name={name}
                    value={name}
                    checked={done}
                  />
                  <span className={styles.checkmark}></span>
                </label>
              </li>
            );
          })}
        </ul>
      </Accordion>
    </div>
  );
}

export default Checklist;
