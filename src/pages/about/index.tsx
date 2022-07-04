import { memo, useEffect, useRef } from 'react';
import classnames from 'classnames';
import gsap from 'gsap';

import styles from './index.module.scss';

import Head from '@/components/Head/Head';

type Props = {
  className: string;
};

function About({ className }: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline().fadeIn(titleRef.current, 0.2);

    return () => {
      timeline?.kill();
    };
  }, []);

  return (
    <main className={classnames(styles.About, className)}>
      <Head title="About" />

      <h1 className={styles.title} ref={titleRef}>
        About Page
      </h1>
    </main>
  );
}

export default memo(About);
