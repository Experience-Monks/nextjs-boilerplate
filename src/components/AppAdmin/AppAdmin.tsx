import { memo, useState } from 'react';
import { os, browser, device } from '@jam3/detect';
import { useWindowSize } from 'react-use';
import classnames from 'classnames';

import styles from './AppAdmin.module.scss';

function AppAdmin() {
  const [removed, setRemoved] = useState(false);
  const [open, setOpen] = useState(true);
  const [deviceOpen, deviceSetOpen] = useState(true);
  const [buildOpen, buildSetOpen] = useState(true);
  const { width, height } = useWindowSize();

  return !removed ? (
    <div className={styles.AppAdmin}>
      <button onClick={() => setOpen(!open)}>{open ? 'Close ' : 'Open '} Admin</button>
      {open && (
        <>
          <section className={styles.adminSection}>
            <h3 className={styles.adminSectionTitle} onClick={() => setRemoved(true)}>
              Remove Admin from DOM
            </h3>
          </section>
          <section className={classnames(styles.adminSection, { [styles.closed]: deviceOpen })}>
            <h3 className={styles.adminSectionTitle} onClick={() => deviceSetOpen(!deviceOpen)}>
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
          <section className={classnames(styles.adminSection, { [styles.closed]: buildOpen })}>
            <h3 className={styles.adminSectionTitle} onClick={() => buildSetOpen(!buildOpen)}>
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
}

export default memo(AppAdmin);
