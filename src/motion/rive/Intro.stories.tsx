import React from 'react'
import { StoryFn } from '@storybook/react'

import { Intro } from './Intro'

export default { title: 'motion/rive/Intro' }

export const Default: StoryFn = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Intro />
    </div>
  )
}
Default.args = {}
