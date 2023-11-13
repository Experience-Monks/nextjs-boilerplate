import type { RefObject } from 'react'
import type content from '@/data/content.json'

export type Content = typeof content
export type CommonContent = typeof content.common

export type HeadProps = {
  title: string
  image?: string
  siteName?: string
  description?: string
}

export type PageProps = {
  head: HeadProps
  common: CommonContent
  noLayout?: boolean
  onReady?: (handle: RefObject<PageHandle>) => void
}

export type PageHandle = {
  animateIn: () => gsap.core.Timeline
  animateOut: () => gsap.core.Timeline
}
