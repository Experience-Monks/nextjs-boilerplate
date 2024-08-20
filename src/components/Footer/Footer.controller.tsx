import type { FC } from 'react'
import type { CommonContent } from '@/services/cms.service'

import { memo } from 'react'

import { View } from './Footer.view'

export interface ControllerProps {
  className?: string
  content: CommonContent['footer']
}

// Controller (handles global state, router, data fetching, etc. Feeds props to the view component)
export const Controller: FC<ControllerProps> = memo((props) => {
  return <View {...props} />
})

Controller.displayName = 'Footer_Controller'
