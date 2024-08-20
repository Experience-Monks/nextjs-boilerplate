import type { PageAboutProps } from '@/components/PageAbout'
import type { GetStaticProps } from 'next'

import { CmsService } from '@/services/cms.service'

export const getStaticProps: GetStaticProps<PageAboutProps> = async () => {
  return {
    props: {
      content: CmsService.getPageContent('about')
    }
  }
}

export { PageAbout as default } from '@/components/PageAbout'
