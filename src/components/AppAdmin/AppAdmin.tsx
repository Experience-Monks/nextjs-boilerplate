import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'

import css from './AppAdmin.module.scss'

import { browser, device, os } from '@/utils/detect'
import { productionLog } from '@/utils/log'
import { getRuntimeEnv, isDevEnv } from '@/utils/runtime-env'

import useWindowSize from '@/hooks/use-window-size'

export interface AppAdminProps {
  // List here all props that are public and settable by the parent component.
  className?: string
}

export interface ViewProps extends AppAdminProps {
  // List here the private props that are only settable by the controller component.
  env: string
  date: string
  commit: string
  version: string
}

// View (pure and testable component, receives props from the controller)
export const View: FC<ViewProps> = ({ className, env, date, commit, version }) => {
  const { width, height } = useWindowSize()

  const [open, setOpen] = useState(!!process.env.STORYBOOK || env !== 'local')
  const [render, setRender] = useState(false)
  const [removed, setRemoved] = useState(false)
  const [expanded, setExpanded] = useState(!!process.env.STORYBOOK)
  const [buildOpen, buildSetOpen] = useState(true)
  const [deviceOpen, deviceSetOpen] = useState(true)

  const toggleOpen = useCallback(() => {
    if (open) setExpanded(false)
    setOpen(!open)
  }, [open])

  const toggleExpanded = useCallback(() => setExpanded((e) => !e), [])

  useEffect(() => {
    productionLog(env, `${version}`)
  }, [commit, env, version])

  useEffect(() => {
    setRender(isDevEnv() && !removed)
  }, [env, removed])

  return render ? (
    <>
      <div className={classNames('AppAdmin', css.root, className)} aria-hidden>
        <div className={classNames(css.basic, { [css.open]: open, [css.closed]: !open })}>
          {open ? (
            <>
              <div>
                {env} | {version} |
              </div>
              &nbsp;
              <button onClick={toggleExpanded}>
                <div>{expanded ? '▼' : '▲'}</div>
              </button>
              <button onClick={toggleOpen}>
                <div>▶</div>
              </button>
            </>
          ) : (
            <button onClick={toggleOpen}>
              <div>◀</div>
            </button>
          )}
        </div>

        {expanded ? (
          <div className={css.details}>
            <div className={css.content}>
              <div className={classNames(css.section, { [css.closed]: deviceOpen })}>
                <h3 className={css.title} onClick={() => deviceSetOpen(!deviceOpen)}>
                  Device info
                </h3>
                {deviceOpen && (
                  <ul>
                    <li>{device.type}</li>
                    <li>
                      {width} x {height}
                    </li>
                    <li>
                      {os.name} {os.version}
                    </li>
                    <li>
                      {browser.name} {browser.version}
                    </li>
                  </ul>
                )}
              </div>

              <div className={classNames(css.section, { [css.closed]: buildOpen })}>
                <h3 className={css.title} onClick={() => buildSetOpen(!buildOpen)}>
                  Build info
                </h3>
                {buildOpen && (
                  <ul>
                    <li>{env}</li>
                    <li>{version}</li>
                    <li>{commit}</li>
                    <li>{date}</li>
                  </ul>
                )}
              </div>

              <div className={css.section}>
                <h3 className={css.title} onClick={() => setRemoved(true)}>
                  Remove Admin from DOM
                </h3>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  ) : null
}

View.displayName = 'AppAdmin-View'

// Controller (handles global state, router, data fetching, etc. Feeds props to the view component)
const AppAdmin: FC<AppAdminProps> = (props) => {
  const env = useMemo(() => getRuntimeEnv(), [])

  return (
    <View
      {...props}
      env={env}
      date={process.env.NEXT_PUBLIC_COMMIT_DATE || ''}
      commit={process.env.NEXT_PUBLIC_COMMIT_ID || ''}
      version={process.env.NEXT_PUBLIC_VERSION_NUMBER || ''}
    />
  )
}

export default memo(AppAdmin)
