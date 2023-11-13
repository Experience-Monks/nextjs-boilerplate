import type { FC } from 'react'
import type { StoryFn } from '@storybook/react'
import type { NavHandle, ViewProps } from './Nav'

import { useEffect, useRef } from 'react'

import content from '@/data/content.json'

import { View } from './Nav'

export default { title: 'components/Nav' }

const Template: FC<ViewProps> = ({ ...args }) => {
  const handleRef = useRef<NavHandle>(null)

  useEffect(() => {
    handleRef.current?.animateIn()
  }, [])

  return <View {...args} handleRef={handleRef} />
}

export const Default: StoryFn<ViewProps> = (args) => {
  return <Template {...args} />
}

Default.args = {
  content: content.common.nav
}

Default.argTypes = {}
