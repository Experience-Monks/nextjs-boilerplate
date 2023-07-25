import { FC, memo, useEffect, useState } from 'react'
import classNames from 'classnames'

import css from './ScreenRotate.module.scss'

import { Content } from '@/data/types'

import ResizeService from '@/services/resize'

import copy from '@/utils/copy'
import { device } from '@/utils/detect'

export interface ScreenRotateProps {
  className?: string
  content: Content['common']['screenRotate']
}

export interface ViewProps extends ScreenRotateProps {}

// View (pure and testable component, receives props from the controller)
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

View.displayName = 'ScreenRotate-View'

// Controller (handles global state, router, data fetching, etc. Feeds props to the view component)
const ScreenRotate: FC<ScreenRotateProps> = (props) => {
  return <View {...props} />
}

export default memo(ScreenRotate)
