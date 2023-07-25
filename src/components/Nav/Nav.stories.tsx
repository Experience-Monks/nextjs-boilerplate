import { FC, useEffect, useRef } from 'react'
import { StoryFn } from '@storybook/react'

import content from '@/data/content.json'

import { NavHandle, View, ViewProps } from './Nav'

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
