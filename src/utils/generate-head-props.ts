import type { HeadProps } from '@/data/types'

import content from '@/data/content.json'

import copy from '@/utils/copy'

const generateHeadProps = (
  title = '',
  description = '',
  image = `/common/assets/images/share-image.jpg?v${process.env.NEXT_PUBLIC_VERSION_NUMBER}`
): HeadProps => {
  const parsedTitle = copy
    .parse(
      content.head.title,
      {
        title: title
          ? copy
              .plain(title)
              .toLowerCase()
              .trim()
              .split(' ')
              .map((s) => s[0].toUpperCase() + s.slice(1))
              .join(' ')
          : ''
      },
      true,
      true
    )
    .trim()

  return {
    ...content.head,
    image,
    title: parsedTitle.startsWith('| ') ? parsedTitle.slice(2) : parsedTitle,
    description: copy.parse(
      content.head.description,
      { description: description || content.pageHome.head.description },
      true,
      true
    )
  }
}

export default generateHeadProps
