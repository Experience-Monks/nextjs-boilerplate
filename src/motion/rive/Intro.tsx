import { ComponentProps, FC } from 'react'
import { Fit, Layout, useRive, UseRiveOptions, UseRiveParameters } from '@rive-app/react-canvas'

interface Props extends ComponentProps<'canvas'> {
  riveParams?: UseRiveParameters
  riveOpts?: Partial<UseRiveOptions>
}

export const Intro: FC<Props> = ({ riveParams, riveOpts, ...props }) => {
  const { RiveComponent } = useRive(
    {
      src: require('@/assets/rive/x-intro.riv'),
      layout: new Layout({ fit: Fit.Cover }),
      autoplay: true,
      ...riveParams
    },
    riveOpts
  )
  return <RiveComponent {...props} />
}
