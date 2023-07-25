import { GetStaticProps } from 'next'

import content from '@/data/content.json'

import generateHeadProps from '@/utils/generate-head-props'

import PageHome, { PageHomeProps } from '@/components/PageHome/PageHome'

export const getStaticProps: GetStaticProps<PageHomeProps> = async () => {
  return {
    props: {
      head: generateHeadProps(content.pageHome.head.title, content.pageHome.head.description),
      common: content.common,
      content: content.pageHome
    }
  }
}

export default PageHome
