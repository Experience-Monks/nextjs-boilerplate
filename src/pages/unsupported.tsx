import { GetStaticProps } from 'next'

import content from '@/data/content.json'

import generateHeadProps from '@/utils/generate-head-props'

import PageUnsupported, { PageUnsupportedProps } from '@/components/PageUnsupported/PageUnsupported'

export const getStaticProps: GetStaticProps<PageUnsupportedProps> = async () => {
  return {
    props: {
      head: generateHeadProps(content.pageUnsupported.head.title, content.pageUnsupported.head.description),
      common: content.common,
      content: content.pageUnsupported
    }
  }
}

export default PageUnsupported
