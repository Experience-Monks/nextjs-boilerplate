import { StoryFn } from '@storybook/react'

import css from './BaseCarouselStories.module.scss'

import BaseImage from '@/components/BaseImage/BaseImage'

import { View, ViewProps } from './BaseCarousel'

export default { title: 'components/BaseCarousel' }

export const Default: StoryFn<ViewProps> = (args) => {
  return (
    <div className={css.wrapper}>
      <View {...args}>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <div className={css.cards} key={`card-${i}`}>
              <h4>Card {i + 1}</h4>
            </div>
          ))}
      </View>
    </div>
  )
}

export const Images: StoryFn<ViewProps> = (args) => {
  return (
    <div className={css.wrapper}>
      <View {...args}>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <div className={css.cards} key={`image-card-${i}`}>
              <BaseImage className={css.image} src={`https://source.unsplash.com/random/600x800?sig=${i}`} alt="" />
            </div>
          ))}
      </View>
    </div>
  )
}

Default.args = Images.args = {
  swiperConfig: {
    slidesPerView: 'auto',
    spaceBetween: 20
  }
}

Default.argTypes = Images.argTypes = {
  swiperConfig: {
    control: {
      type: 'object'
    }
  }
}
