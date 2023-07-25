import { GetStaticProps } from 'next'

import content from '@/data/content.json'

import generateHeadProps from '@/utils/generate-head-props'

import PageAbout, { PageAboutProps } from '@/components/PageAbout/PageAbout'

export const getStaticProps: GetStaticProps<PageAboutProps> = async () => {
  return {
    props: {
      head: generateHeadProps(content.pageAbout.head.title, content.pageAbout.head.description),
      common: content.common,
      content: content.pageAbout
    }
  }
}

export default PageAbout
