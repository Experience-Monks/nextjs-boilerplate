import type { PageUnsupportedProps } from '@/components/PageUnsupported/PageUnsupported'
import type { GetStaticProps } from 'next'

import content from '@/data/content.json'

import generateHeadProps from '@/utils/generate-head-props'

export const getStaticProps: GetStaticProps<PageUnsupportedProps> = async () => {
  return {
    props: {
      head: generateHeadProps(content.pageUnsupported.head.title, content.pageUnsupported.head.description),
      common: content.common,
      content: content.pageUnsupported,
      noLayout: true
    }
  }
}

export { default } from '@/components/PageUnsupported/PageUnsupported'
