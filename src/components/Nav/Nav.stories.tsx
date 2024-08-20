import type { StoryFn } from '@storybook/react'
import type { ViewHandle, ViewProps } from './Nav.view'

import { useEffect, useRef } from 'react'

import { CmsService } from '@/services/cms.service'

import { View } from './Nav.view'

export default { title: 'components/Nav' }

export const Default: StoryFn<ViewProps> = (args) => {
  const handleRef = useRef<ViewHandle>(null)
  useEffect(() => {
    handleRef.current?.animateIn()
  }, [])
  return <View {...args} handleRef={handleRef} />
}

Default.args = {
  content: CmsService.getPageContent('home').common.nav
}

Default.argTypes = {}
