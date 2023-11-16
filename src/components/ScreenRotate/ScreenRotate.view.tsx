import type { ControllerProps } from './ScreenRotate.controller'

import { type FC, useEffect, useState } from 'react'
import classNames from 'classnames'

import css from './ScreenRotate.module.scss'

import ResizeService from '@/services/resize'

import copy from '@/utils/copy'
import { device } from '@/utils/detect'

export interface ViewProps extends ControllerProps {}

// View (pure and testable component, receives props exclusively from the controller)
export const View: FC<ViewProps> = ({ className, content }) => {
  const [enable, setEnable] = useState(process.env.STORYBOOK || (!device.desktop && device.phone && device.landscape))

  useEffect(() => {
    const handleResize = () => {
      setEnable(device.phone && device.landscape)
    }

    ResizeService.listen(handleResize)

    return () => {
      ResizeService.dismiss(handleResize)
    }
  }, [])

  return enable ? (
    <div className={classNames('ScreenRotate', css.root, className)}>
      <p className={css.title} {...copy.html(content.title, {}, true)} />
      <p className={css.description} {...copy.html(content.description, {}, true)} />
    </div>
  ) : null
}

View.displayName = 'ScreenRotate_View'