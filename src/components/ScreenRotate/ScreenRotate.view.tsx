import type { ControllerProps } from './ScreenRotate.controller'

import { type FC, useEffect, useState } from 'react'
import classNames from 'classnames'

import css from './ScreenRotate.module.scss'

import { ResizeService } from '@/services/resize.service'

import { copy } from '@/utils/copy'
import { device } from '@/utils/detect'

import { useRefs } from '@/hooks/use-refs'

export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement
}

// View (pure and testable component, receives props exclusively from the controller)
export const View: FC<ViewProps> = ({ className, content }) => {
  const refs = useRefs<ViewRefs>()

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
    <div className={classNames('ScreenRotate', css.root, className)} ref={refs.root}>
      <p className={css.title} {...copy.html(content.title, {}, 10)} />
      <p className={css.description} {...copy.html(content.description, {}, 10)} />
    </div>
  ) : null
}

View.displayName = 'ScreenRotate_View'
