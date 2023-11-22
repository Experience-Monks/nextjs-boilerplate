import data from '@/data/content.json'

import { copy } from '@/utils/copy'

export type PageIdentifier = keyof typeof data.pages
export type CommonContent = typeof data.common
export type HeadContent = typeof data.common.head
export type PageContent<T extends PageIdentifier = 'home'> = {
  head: HeadContent
  common: CommonContent
  body: (typeof data.pages)[T]['body']
}

const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || ''
const buildNumber = process.env.NEXT_PUBLIC_BUILD_NUMBER || ''

class Service {
  getPageContent = <T extends PageIdentifier>(pageIdentifier: T): PageContent<T> => {
    const pageContent = data.pages[pageIdentifier]
    const common = data.common
    const pageTitle = copy
      .parse(common.head.title, { title: pageContent.head.title ? copy.plain(pageContent.head.title) : '' }, true, true)
      .trim()
    const head = {
      ...common.head,
      ...pageContent.head,
      image: `${assetPrefix}/common/assets/images/share-image.jpg?v${buildNumber}`,
      title: pageTitle.startsWith('–') || pageTitle.startsWith('|') ? pageTitle.substring(2) : pageTitle,
      description: copy.parse(
        common.head.description,
        { description: pageContent.head.description || data.pages.home.head.description },
        true,
        true
      )
    }
    const body = pageContent.body
    return { head, body, common }
  }
}

export const CmsService = new Service()
