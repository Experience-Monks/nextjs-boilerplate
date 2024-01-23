import type { PageContent, PageIdentifier } from '@/services/cms'

export type PageProps<T extends PageIdentifier = 'home'> = {
  content: PageContent<T>
  noLayout?: boolean
}
