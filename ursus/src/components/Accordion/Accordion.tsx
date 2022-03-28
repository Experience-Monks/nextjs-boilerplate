import { PropsWithChildren, useLayoutEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import gsap from 'gsap';

import styles from './Accordion.module.scss';

import { CONSTANTS } from './../../utils/constants';

import CloseIcon from '@/components/svgs/accordion-close.svg';
import OpenIcon from '@/components/svgs/accordion-open.svg';

export type Props = PropsWithChildren<{
  className?: string;
  title: string;
  count?: number;
  totalListNumber?: number;
}>;

function Accordion({ className, children, title, count, totalListNumber }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef(null);
  const completionStatus = count === totalListNumber ? CONSTANTS.COMPLETE : CONSTANTS.INCOMPLETE;
  const initialLoadRef = useRef(false);

  useLayoutEffect(() => {
    const ease = gsap.parseEase('0, 1, 0.5, 1');

    if (isOpen && !initialLoadRef.current) {
      gsap.set(contentRef.current, { height: 'auto', opacity: 1 });
      initialLoadRef.current = true;
    } else if (isOpen && initialLoadRef.current) {
      gsap.set(contentRef.current, { height: 'auto' });
      gsap.from(contentRef.current, { duration: 0.75, height: 0, opacity: 0, ease });
      gsap.to(contentRef.current, { duration: 0.75, opacity: 1, ease });
    } else {
      gsap.to(contentRef.current, { duration: 0.75, height: 0, opacity: 0, ease });
    }
  }, [isOpen]);

  return (
    <div className={classnames(styles.Accordion, className)}>
      <div className={styles.titleWrapper}>
        {isOpen ? (
          <CloseIcon className={classnames(styles.accordionBtn, styles.closeIcon)} onClick={() => setIsOpen(false)} />
        ) : (
          <OpenIcon className={classnames(styles.accordionBtn, styles.openIcon)} onClick={() => setIsOpen(true)} />
        )}
        {count ? (
          <>
            <div className={styles.title}>
              <h2 className={styles.titleName}>
                {title} {count}/{totalListNumber}
              </h2>
            </div>
            <div className={classnames(styles.status, { [styles.complete]: count === totalListNumber })}>
              {completionStatus}
            </div>
          </>
        ) : (
          <h2 className={styles.titleName}>{title}</h2>
        )}
      </div>
      <div ref={contentRef} className={styles.content}>
        {children}
      </div>
    </div>
  );
}

export default Accordion;
