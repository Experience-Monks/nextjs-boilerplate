import type { FC, RefObject } from 'react'
import type { PageHandle } from '@/data/types'
import type { StoryFn } from '@storybook/react'
import type { ViewProps } from './PageHome'

import { useCallback } from 'react'

import content from '@/data/content.json'

import { View } from './PageHome'

export default { title: 'pages/PageHome' }

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
  content: content.pageHome,
  common: content.common
}

Default.argTypes = {}
