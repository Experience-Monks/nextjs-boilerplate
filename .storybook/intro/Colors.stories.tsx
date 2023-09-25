import React, { FC } from 'react'
import { StoryFn } from '@storybook/react'

import css from './Colors.module.scss'

import sass from '../../src/utils/sass'

export default { title: 'intro/Colors' }

const Colors: FC<{}> = () => {
  console.log(sass.color)

  return (
    <div className={css.root} style={{ width: '90%', padding: '30px' }}>
      {Object.keys(sass.color).map((key) => (
        <div key={key} className={css.item}>
          <div className={css.color} style={{ background: sass.color[key] }} />
          <div className={css.label}>
            ${key} ({sass.color[key]})
          </div>
        </div>
      ))}
    </div>
  )
}

export const Default: StoryFn<{}> = (args) => <Colors {...args} />

Default.args = {}
