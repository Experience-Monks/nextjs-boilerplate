import { FC, memo } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import css from './Footer.module.scss';

import routes from '@/data/routes';

export interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({ className }) => {
  return (
    <footer className={classNames('Footer', css.root, className)}>
      <ul>
        {Object.values(routes).map(({ path, title }) => (
          <li key={path}>
            <Link href={path}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default memo(Footer);
