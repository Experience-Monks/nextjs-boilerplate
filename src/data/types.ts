import type { PageContent, PageIdentifier } from '@/services/cms.service'

export type PageProps<T extends PageIdentifier = 'home'> = {
  content: PageContent<T>
  noLayout?: boolean
}
