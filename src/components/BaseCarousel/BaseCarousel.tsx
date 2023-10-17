import { Children, forwardRef, memo, PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import Swiper from 'swiper'
import { A11y } from 'swiper/modules'
import { SwiperOptions } from 'swiper/types'

import css from './BaseCarousel.module.scss'

import useCombinedRefs from '@/hooks/use-combined-refs'

export interface BaseCarouselProps extends PropsWithChildren {
  className?: string
  swiperConfig?: SwiperOptions
}

const defaultSwiperConfig: SwiperOptions = {
  slidesPerView: 'auto',
  wrapperClass: css.swiperWrapper,
  slideClass: css.swiperSlide,
  spaceBetween: 20,
  allowTouchMove: true,
  keyboard: {
    enabled: true,
    onlyInViewport: true
  }
}

export interface ViewProps extends BaseCarouselProps {}

// View (pure and testable component, receives props from the controller)
export const View = forwardRef<HTMLDivElement, ViewProps>(({ className, swiperConfig, children }, ref) => {
  const rootRef = useRef<HTMLDivElement>(null)

  const swiperContainerRef = useRef<HTMLDivElement>(null)
  const swiperWrapperRef = useRef<HTMLDivElement>(null)
  const swiperObjectRef = useRef<Swiper | null>(null)
  const childrenCount = Children.count(children)
  const [activeIndex, setActiveIndex] = useState(swiperConfig?.initialSlide || 0)

  const combinedRootRef = useCombinedRefs<HTMLDivElement>(ref, rootRef)

  const swiperOptionsRef: SwiperOptions = useMemo(() => {
    return {
      modules: [A11y],
      ...defaultSwiperConfig,

      on: {
        activeIndexChange: (swiper) => {
          setActiveIndex(swiper.activeIndex)
        }
      },
      ...swiperConfig
    }
  }, [swiperConfig])

  useEffect(() => {
    try {
      if (swiperContainerRef.current) {
        swiperObjectRef.current = new Swiper(swiperContainerRef.current, swiperOptionsRef)
      }
    } catch (error) {
      console.error('Failed to initialize Swiper:', error)
    }

    return () => {
      swiperObjectRef.current?.destroy()
    }
  }, [swiperOptionsRef])

  useEffect(() => {
    // @TODO: Replace with your implementation
    console.log(`Current slide: ${activeIndex}`)
  }, [activeIndex])

  return childrenCount ? (
    <div className={classNames('BaseCarousel', css.root, className)} ref={combinedRootRef}>
      <div className={css.swiperContainer} ref={swiperContainerRef}>
        <div className={css.swiperWrapper} ref={swiperWrapperRef}>
          {Children.map(children, (child, i) => (
            <div className={css.swiperSlide} key={`swiper-slide-${i}`}>
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null
})

View.displayName = 'BaseCarousel-View'

// Controller (handles global state, router, data fetching, etc. Feeds props to the view component)
const BaseCarousel = forwardRef<HTMLDivElement, BaseCarouselProps>((props, ref) => {
  return <View {...props} ref={ref} />
})

BaseCarousel.displayName = 'BaseCarousel'

export default memo(BaseCarousel)
