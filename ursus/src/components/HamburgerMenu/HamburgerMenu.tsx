import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import gsap from 'gsap';

import styles from './HamburgerMenu.module.scss';

import CloseIcon from '../svgs/close.svg';
import HamburgerIcon from '../svgs/hamburger.svg';

export type Props = PropsWithChildren<{
  className?: string;
  projectName: string;
}>;

function HamburgerMenu({ className, children, projectName }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const ease = gsap.parseEase('0, 1, 0.5, 1');

    if (isOpen) {
      gsap.set(contentRef.current, { height: 'calc( 100vh - 76px)' });
      gsap.from(contentRef.current, { duration: 0.55, height: 0, opacity: 0, ease });
      gsap.to(contentRef.current, { duration: 0.55, opacity: 1, ease });
    } else {
      gsap.to(contentRef.current, { duration: 0.55, height: 0, opacity: 0, ease });
    }
  }, [isOpen]);

  const handleCloseMenu = () => {
    document.body.style.overflow = 'auto';
    setIsOpen(false);
  };

  const handleOpenMenu = () => {
    document.body.style.overflow = 'hidden';
    setIsOpen(true);
  };

  return (
    <div className={classnames(styles.HamburgerMenu, className)}>
      <div className={styles.logo}>
        {isOpen ? (
          <CloseIcon className={styles.closeIcon} onClick={() => handleCloseMenu()} />
        ) : (
          <HamburgerIcon className={styles.hamburgerIcon} onClick={() => handleOpenMenu()} />
        )}
        <span className={styles.projectName}>{projectName} </span>
      </div>
      <div ref={contentRef} className={styles.container}>
        {children}
      </div>
    </div>
  );
}

export default HamburgerMenu;
