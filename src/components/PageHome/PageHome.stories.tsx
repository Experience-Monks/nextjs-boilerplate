import { FC, RefObject, useCallback } from 'react'
import { StoryFn } from '@storybook/react'

import content from '@/data/content.json'
import { PageHandle } from '@/data/types'

import { View, ViewProps } from './PageHome'

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
