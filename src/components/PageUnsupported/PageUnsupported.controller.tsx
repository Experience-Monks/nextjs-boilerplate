import type { FC } from 'react'
import type { PageProps } from '@/data/types'

import { memo } from 'react'

import { View } from './PageUnsupported.view'

export interface ControllerProps extends PageProps<'unsupported'> {}

// Controller (handles global state, router, data fetching, etc. Feeds props to the view component)
export const Controller: FC<ControllerProps> = memo((props) => {
  return <View {...props} />
})

Controller.displayName = 'PageUnsupported_Controller'
