import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './Footer.module.scss';

import routes from '@/data/routes';

import BaseButton from '@/components/BaseButton/BaseButton';

export interface FooterProps {
  className?: string;
}

const Footer: FC<FooterProps> = ({ className }) => {
  return (
    <footer className={classNames('Footer', css.root, className)}>
      <ul>
        {Object.values(routes).map(({ path, title }) => (
          <li key={path}>
            <BaseButton href={path}>
              <a>{title}</a>
            </BaseButton>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default memo(Footer);
