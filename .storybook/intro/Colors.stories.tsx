import React, { FC } from 'react'
import { StoryFn } from '@storybook/react'

import css from './Colors.module.scss'

import sass from '../../src/utils/sass'

export default { title: 'intro/Colors' }

const Typographies: FC<{}> = () => {
  return (
    <div className={css.root} style={{ width: '90%', padding: '30px' }}>
      {Object.entries(sass)
        .filter(([key, value]) => value.startsWith('#'))
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

export const Default: StoryFn<{}> = (args) => <Typographies {...args} />

Default.args = {}
