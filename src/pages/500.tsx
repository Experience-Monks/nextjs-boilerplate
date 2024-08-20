import type { PageNotFoundProps } from '@/components/PageNotFound'
import type { GetStaticProps } from 'next'

import { CmsService } from '@/services/cms.service'

export const getStaticProps: GetStaticProps<PageNotFoundProps> = async () => {
  return {
    props: {
      content: CmsService.getPageContent('notFound'),
      noLayout: true
    }
  }
}

export { PageNotFound as default } from '@/components/PageNotFound'
