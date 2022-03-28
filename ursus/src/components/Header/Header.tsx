import React from 'react';
import classnames from 'classnames';

import styles from './Header.module.scss';

import Breadcrumbs from './../../components/Breadcrumbs/Breadcrumbs';
import QuickLink from './../../components/QuickLink/QuickLink';

import { Setting } from './../../types/ursusTypes';

import DropdownIcon from '@/components/svgs/dropdown.svg';
import placeholderImage from '@/assets/images/profileplaceholder.jpg';

export type Props = {
  className?: string;
  setting?: Setting;
};

function Header({ className, setting }: Props) {
  return (
    <nav className={classnames(styles.Header, className)}>
      <div className={styles.profile}>
        <img className={styles.profileImage} src={placeholderImage} alt="Profile" />
        <DropdownIcon className={styles.dropdownIcon} />
      </div>
      {setting && (
        <>
          <Breadcrumbs setting={setting} />
          <h2 className={styles.name}>{setting?.title || setting?.name}</h2>
          <h4 className={styles.description}>{setting.description}</h4>
          {setting.quicklink && setting.quicklink.length > 0 && (
            <div className={styles.quickLinkWrapper}>
              {setting.quicklink.map((item, index) => {
                return <QuickLink key={index} info={item} />;
              })}
            </div>
          )}
        </>
      )}
    </nav>
  );
}

export default Header;
