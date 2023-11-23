import type { ImgHTMLAttributes } from 'react'
import type { StaticImageData } from 'next/image'
import type { OptmizedImageEdits } from '@/utils/get-optimized-image-url'

import { forwardRef, memo } from 'react'

import { View } from './BaseImage.view'

export interface ControllerProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  data?: StaticImageData
  options?: OptmizedImageEdits
  srcWidths?: number[]
  allowRetina?: boolean
  fetchpriority?: 'high' | 'low' | 'auto'
  skipOptimization?: boolean
  onLoad?: () => void
}

// Controller (handles global state, router, data fetching, etc. Feeds props to the view component)
export const Controller = memo(
  forwardRef<HTMLImageElement, ControllerProps>((props, ref) => {
    return <View {...props} ref={ref} />
  })
)

Controller.displayName = 'BaseImage_Controller'
