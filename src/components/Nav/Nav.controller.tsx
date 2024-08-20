import type { FC, ForwardedRef } from 'react'
import type { CommonContent } from '@/services/cms.service'
import type { ViewHandle } from './Nav.view'

import { memo } from 'react'

import { View } from './Nav.view'

export interface ControllerProps {
  className?: string
  handleRef?: ForwardedRef<ViewHandle>
  content: CommonContent['nav']
}

// Controller (handles global state, router, data fetching, etc. Feeds props to the view component)
export const Controller: FC<ControllerProps> = memo((props) => {
  return <View {...props} />
})

Controller.displayName = 'Nav_Controller'
