import { memo, useRef, useEffect } from 'react';
import classnames from 'classnames';
import gsap from 'gsap';

import styles from './index.module.scss';

import Head from '@/components/Head/Head';

type Props = {
  className: string;
};

function About({ className }: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const headerElRef = headerRef.current;
    gsap.effects.fadeIn(headerElRef, { delay: 0.1 });

    return () => {
      gsap.killTweensOf(headerElRef);
    };
  }, []);

  return (
    <main className={classnames(styles.About, className)} ref={containerRef}>
      <Head title="About" />
      <h1 className={styles.title} ref={headerRef}>
        About Page
      </h1>
    </main>
  );
}

export default memo(About);
