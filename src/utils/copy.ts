import camel from 'lodash.camelcase'
import kebab from 'lodash.kebabcase'
import format from 'string-format'
import xss, { getDefaultWhiteList } from 'xss'

class Copy {
  sanitize(string: string | undefined) {
    if (!string) return ''
    return xss(string, {
      whiteList: {
        ...getDefaultWhiteList(),
        a: ['href', 'title', 'target', 'rel'],
        div: ['data-replace'],
        span: ['class']
      },
      onTag(tag) {
        if (tag === 'br') {
          return '<br aria-hidden="true" />'
        }
      }
    })
  }

  parse(string: string, values = {}, removeLineBreaks = false, removeHTML = false) {
    if (!string) return ''
    if (typeof string !== 'string') return string
    const v = { br: '<br />', ...values }
    const s = string
      .trim()
      .replace(/< \/([^>]*>)/giu, '</$1') // Example: < /li> -> </li>
      .replace(/\n|<br>|<br\/>/gu, removeLineBreaks ? ' ' : '{br}')
    const formatted = format(s, v) || s
    return this.sanitize(
      removeHTML
        ? formatted.replace(/<[^<>]{1,255}>/gu, '') // note: increase range if needed
        : formatted
    )
  }

  plain(string: string | undefined, values = {}) {
    if (!string) return ''
    return this.parse(string, values, true, true)
  }

  aria(label?: string, role?: string) {
    const result: { [key: string]: string } = {}
    if (label) result['aria-label'] = this.plain(label)
    if (role) result.role = this.sanitize(role)
    return result
  }

  html(string: string | undefined, values = {}, killWidows = 0, removeLineBreaks = false) {
    if (!string) return ''

    let html = this.parse(string, values, removeLineBreaks) || ''

    if (killWidows) {
      const texts = html.split(/<[^<>]{1,255}>/gu) // note: increase range if needed
      texts.forEach((text) => {
        const n = killWidows // minimum character count for the final word
        const line = text.replace(/\s/gu, ' ')
        const chunk = line.substr(-n)
        const fixed =
          line.substr(0, line.length - chunk.length) +
          chunk.replace(/(\s{1,5}$)|\s/gu, (_, $1) => {
            // keep the last space of the chunk, replace the others
            return $1 || '&nbsp;'
          })
        if (html && html.replace) html = html.replace(text, fixed)
      })
    }

    return {
      dangerouslySetInnerHTML: { __html: this.sanitize(html) }
    }
  }

  kebab<T extends string>(string: T): T {
    return this.sanitize(kebab(string as string)) as T
  }

  camel<T extends string>(string: T): T {
    return this.sanitize(camel(string as string)) as T
  }

  pascal<T extends string>(string: T): T {
    const str = this.camel(string as string)
    return (str.charAt(0).toUpperCase() + str.slice(1)) as T
  }
}

export const copy = new Copy()
