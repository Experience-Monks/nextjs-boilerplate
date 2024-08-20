import type { PageHomeProps } from '@/components/PageHome'
import type { GetStaticProps } from 'next'

import { CmsService } from '@/services/cms.service'

export const getStaticProps: GetStaticProps<PageHomeProps> = async () => {
  return {
    props: {
      content: CmsService.getPageContent('home')
    }
  }
}

export { PageHome as default } from '@/components/PageHome'
