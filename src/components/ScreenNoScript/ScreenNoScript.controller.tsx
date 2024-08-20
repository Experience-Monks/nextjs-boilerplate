import type { FC } from 'react'
import type { CommonContent } from '@/services/cms.service'

import { memo } from 'react'

import { useFeatureFlags } from '@/hooks/use-feature-flags'

import { View } from './ScreenNoScript.view'

export interface ControllerProps {
  className?: string
  content: CommonContent['screenNoScript']
}

// Controller (handles global state, router, data fetching, etc. Feeds props to the view component)
export const Controller: FC<ControllerProps> = memo((props) => {
  const { flags } = useFeatureFlags()
  return flags.javascriptRequired ? <View {...props} /> : null
})

Controller.displayName = 'ScreenNoScript_Controller'
