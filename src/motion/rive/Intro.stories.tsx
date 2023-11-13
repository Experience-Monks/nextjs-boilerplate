import type { StoryFn } from '@storybook/react'

import { Intro } from './Intro'

export default { title: 'motion/Rive/Intro' }

export const Default: StoryFn = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Intro />
    </div>
  )
}
Default.args = {}
