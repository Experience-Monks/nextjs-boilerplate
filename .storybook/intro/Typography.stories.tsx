import type { FC } from 'react'
import type { StoryFn } from '@storybook/react'

import React, { Fragment } from 'react'

import css from './Typography.module.scss'

export default { title: 'intro/Typography' }

const Typographies: FC<{ chars: string }> = ({ chars }) => {
  return (
    <div className={css.root}>
      {['h1', 'paragraph'].map((t) => (
        <Fragment key={t}>
          <div className={css.item}>
            <div className={css.figma}>{t}</div>
            <div className={css.sass}>@include typography-{t};</div>
          </div>
          <p className={css[t]}>{chars}</p>
        </Fragment>
      ))}
    </div>
  )
}

export const Default: StoryFn<{ chars: string }> = (args) => <Typographies {...args} />

Default.args = {
  chars: 'The relentless\npursuit of better'
}
