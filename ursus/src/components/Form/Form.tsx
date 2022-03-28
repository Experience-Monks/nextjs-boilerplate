import classnames from 'classnames';

import styles from './Form.module.scss';

import { FieldItem } from './../../types/ursusTypes';

export type Props = {
  className?: string;
  title: string;
  field: FieldItem[];
};

function Form({ className, title, field }: Props) {
  return (
    <div className={classnames(styles.Form, className)}>
      <h3 className={styles.title}>{title}</h3>
      {field &&
        field.length > 0 &&
        field.map((el: FieldItem, index: number) => {
          return (
            <div className={styles.row} key={index}>
              <p>
                <label className={styles.label}>{el.name}</label>
              </p>
              <input type="text" name={el.name} value={el.value} className={styles.field} />
            </div>
          );
        })}
    </div>
  );
}

export default Form;
