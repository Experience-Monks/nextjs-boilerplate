import { FC, memo, useState } from 'react';
import { browser, device, os } from '@jam3/detect';
import classNames from 'classnames';

import css from './AppAdmin.module.scss';

import { useWindowSize } from '@/hooks';

export interface AppAdminProps {
  className?: string;
}

const AppAdmin: FC<AppAdminProps> = ({ className }) => {
  const [removed, setRemoved] = useState(false);
  const [open, setOpen] = useState(true);
  const [deviceOpen, deviceSetOpen] = useState(true);
  const [buildOpen, buildSetOpen] = useState(true);
  const { width, height } = useWindowSize();

  return !removed ? (
    <div className={classNames('AppAdmin', css.root, className)}>
      <button onClick={() => setOpen(!open)}>{open ? 'Close ' : 'Open '} Admin</button>
      {open && (
        <>
          <section className={css.adminSection}>
            <h3 className={css.adminSectionTitle} onClick={() => setRemoved(true)}>
              Remove Admin from DOM
            </h3>
          </section>
          <section className={classNames(css.adminSection, { [css.closed]: deviceOpen })}>
            <h3 className={css.adminSectionTitle} onClick={() => deviceSetOpen(!deviceOpen)}>
              Device info
            </h3>
            {deviceOpen && (
              <ul>
                <li>
                  {device.type} ({width} x {height})
                </li>
                <li>
                  {os.name} {os.version}
                </li>
                <li>
                  {browser.name} {browser.version}
                </li>
              </ul>
            )}
          </section>
          <section className={classNames(css.adminSection, { [css.closed]: buildOpen })}>
            <h3 className={css.adminSectionTitle} onClick={() => buildSetOpen(!buildOpen)}>
              Build info
            </h3>
            {buildOpen && (
              <ul>
                <li>
                  {process.env.NEXT_PUBLIC_PR_NUMBER}.{process.env.NEXT_PUBLIC_COMMIT_COUNT}
                </li>
                <li>{process.env.NEXT_PUBLIC_COMMIT_ID?.slice(0, 6)}</li>
                <li>{process.env.NEXT_PUBLIC_BUILD_TIME}</li>
                {process.env.NEXT_PUBLIC_PULL_REQUEST && (
                  <li>
                    <a href={process.env.NEXT_PUBLIC_PULL_REQUEST} rel="noopener noreferrer" target="_blank">
                      PR link
                    </a>
                  </li>
                )}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  ) : null;
};

export default memo(AppAdmin);
