import type { ControllerProps } from './AppAdmin.controller'

import { type FC, useCallback, useEffect, useReducer, useState } from 'react'
import classNames from 'classnames'

import css from './AppAdmin.module.scss'

import config from '@/data/config.json'

import { browser, device, os } from '@/utils/detect'
import { productionPrint } from '@/utils/print'
import { isDevEnv } from '@/utils/runtime-env'

import { useFeatureFlags } from '@/hooks/use-feature-flags'
import { useRefs } from '@/hooks/use-refs'
import { useWindowSize } from '@/hooks/use-window-size'

export interface ViewProps extends ControllerProps {
  env: string
  date: string
  commit: string
  version: string
}

export type ViewRefs = {
  root: HTMLDivElement
}

// View (pure and testable component, receives props exclusively from the controller)
export const View: FC<ViewProps> = ({ className, env, date, commit, version }) => {
  const refs = useRefs<ViewRefs>()

  const { width, height } = useWindowSize()
  const { flags, setFlag, resetFlags } = useFeatureFlags()

  const [open, setOpen] = useState(Boolean(process.env.STORYBOOK) || env !== 'local')
  const [render, setRender] = useState(false)
  const [removed, setRemoved] = useState(false)
  const [expanded, setExpanded] = useState(Boolean(process.env.STORYBOOK))

  const [sections, setSections] = useReducer(
    (state: { [k: string]: boolean }, newState: { [k: string]: boolean }) => ({ ...state, ...newState }),
    { device: true, build: true, flags: true }
  )

  const toggleOpen = useCallback(() => {
    if (open) setExpanded(false)
    setOpen(!open)
  }, [open])

  const toggleExpanded = useCallback(() => {
    setExpanded((e) => !e)
  }, [])

  useEffect(() => {
    productionPrint(env, `${version}`)
  }, [commit, env, version])

  useEffect(() => {
    setRender(isDevEnv() && !removed)
  }, [env, removed])

  return render ? (
    <div className={classNames('AppAdmin', css.root, className)} ref={refs.root} aria-hidden>
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
            <div className={css.section}>
              <button
                className={css.title}
                onClick={() => {
                  setSections({ device: !sections.device })
                }}
              >
                Device info
              </button>
              {sections.device && (
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

            <div className={css.section}>
              <button
                className={css.title}
                onClick={() => {
                  setSections({ build: !sections.build })
                }}
              >
                Build info
              </button>
              {sections.build && (
                <ul>
                  <li>{env}</li>
                  <li>{version}</li>
                  <li>{commit}</li>
                  <li>{date}</li>
                </ul>
              )}
            </div>

            <div className={css.section}>
              <button
                className={css.title}
                onClick={() => {
                  setSections({ flags: !sections.flags })
                }}
              >
                Feature Flags
              </button>
              {sections.flags && (
                <ul>
                  {Object.entries(config.featureFlags)
                    .filter(([, f]) => 'hot' in f)
                    .map((entry) => {
                      const key = entry[0] as keyof typeof config.featureFlags
                      const value = entry[1]
                      return (
                        <li key={key}>
                          <label>
                            <input
                              type="checkbox"
                              onChange={() => {
                                setFlag(key, !flags[key])
                              }}
                              checked={flags[key]}
                            />
                            <p>{value.label}</p>
                          </label>
                        </li>
                      )
                    })}
                </ul>
              )}
              <button
                className={css.reset}
                onClick={() => {
                  resetFlags()
                }}
              >
                [Reset]
              </button>
            </div>

            <div className={css.section}>
              <button
                className={css.title}
                onClick={() => {
                  setRemoved(true)
                }}
              >
                Remove Admin from DOM
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  ) : null
}

View.displayName = 'AppAdmin_View'
