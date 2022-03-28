import { memo, PropsWithChildren } from 'react';
import yaml from 'js-yaml';

import styles from './Layout.module.scss';

import Sidebar from './../../components/Sidebar/Sidebar';

import { Ursus } from './../../types/ursusTypes';

import ursusConfig from '../../../../ursus.yml';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

export type Props = PropsWithChildren<{}>;

const config = yaml.load(ursusConfig) as Ursus;

function Layout({ children }: Props) {
  const projectName = config.general['project-name'];
  return (
    <div className={styles.Layout}>
      <div className={styles.mobileHeader}>
        <HamburgerMenu projectName={projectName}>
          <Sidebar general={config.general} categories={config.categories} />
        </HamburgerMenu>
      </div>

      <Sidebar className={styles.sidebar} general={config.general} categories={config.categories} />
      <>{children}</>
    </div>
  );
}

export default memo(Layout);
