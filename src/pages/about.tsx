import type { PageAboutProps } from '@/components/PageAbout/PageAbout'
import type { GetStaticProps } from 'next'

import content from '@/data/content.json'

import generateHeadProps from '@/utils/generate-head-props'

export const getStaticProps: GetStaticProps<PageAboutProps> = async () => {
  return {
    props: {
      head: generateHeadProps(content.pageAbout.head.title, content.pageAbout.head.description),
      common: content.common,
      content: content.pageAbout
    }
  }
}

export { default } from '@/components/PageAbout/PageAbout'
