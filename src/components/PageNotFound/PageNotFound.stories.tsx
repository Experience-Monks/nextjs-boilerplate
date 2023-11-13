import type { FC, RefObject } from 'react'
import type { PageHandle } from '@/data/types'
import type { StoryFn } from '@storybook/react'
import type { ViewProps } from './PageNotFound'

import { useCallback } from 'react'

import content from '@/data/content.json'

import { View } from './PageNotFound'

export default { title: 'pages/PageNotFound' }

const Template: FC<ViewProps> = ({ ...args }) => {
  const handleReady = useCallback((pageHandle?: RefObject<PageHandle>) => {
    pageHandle?.current?.animateIn()
  }, [])
  return <View {...args} onReady={handleReady} />
}

export const Default: StoryFn<ViewProps> = (args) => {
  return <Template {...args} />
}

Default.args = {
  content: content.pageNotFound,
  common: content.common
}

Default.argTypes = {}
