import { GetStaticProps } from 'next'

import content from '@/data/content.json'

import generateHeadProps from '@/utils/generate-head-props'

import PageNotFound, { PageNotFoundProps } from '@/components/PageNotFound/PageNotFound'

export const getStaticProps: GetStaticProps<PageNotFoundProps> = async () => {
  return {
    props: {
      head: generateHeadProps(content.pageNotFound.head.title, content.pageNotFound.head.description),
      common: content.common,
      content: content.pageNotFound
    }
  }
}

export default PageNotFound
