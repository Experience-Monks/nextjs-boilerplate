import type { PageHomeProps } from '@/components/PageHome/PageHome'
import type { GetStaticProps } from 'next'

import content from '@/data/content.json'

import generateHeadProps from '@/utils/generate-head-props'

export const getStaticProps: GetStaticProps<PageHomeProps> = async () => {
  return {
    props: {
      head: generateHeadProps(content.pageHome.head.title, content.pageHome.head.description),
      common: content.common,
      content: content.pageHome
    }
  }
}

export { default } from '@/components/PageHome/PageHome'
