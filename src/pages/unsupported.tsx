import type { PageUnsupportedProps } from '@/components/PageUnsupported'
import type { GetStaticProps } from 'next'

import CmsService from '@/services/cms'

export const getStaticProps: GetStaticProps<PageUnsupportedProps> = async () => {
  return {
    props: {
      content: CmsService.getPageContent('unsupported'),
      noLayout: true
    }
  }
}

export { PageUnsupported as default } from '@/components/PageUnsupported'
