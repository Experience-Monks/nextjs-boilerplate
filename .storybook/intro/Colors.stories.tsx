import type { FC } from 'react'
import type { StoryFn } from '@storybook/react'

import React from 'react'

import css from './Colors.module.scss'

import { sass } from '../../src/utils/sass'

export default { title: 'intro/Colors' }

const Colors: FC = () => {
  return (
    <div className={css.root} style={{ width: '90%', padding: '30px' }}>
      {Object.entries(sass)
        .filter(([, value]) => value.startsWith('#'))
        .map(([key, value]) => (
          <div key={key} className={css.item}>
            <div className={css.color} style={{ background: value }} />
            <div className={css.label}>
              ${key} ({value})
            </div>
          </div>
        ))}
    </div>
  )
}

export const Default: StoryFn = (args) => <Colors {...args} />

Default.args = {}
