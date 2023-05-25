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
        a: ['href', 'title', 'target', 'rel']
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
      .replace(/< \/([^>]*>)/gi, '</$1') // Example: < /li> -> </li>
      .replace(/\n|<br>|<br\/>/g, removeLineBreaks ? ' ' : '{br}')
    const formatted = format(s, v) || s
    return this.sanitize(removeHTML ? formatted.replace(/<[^>]*>/g, '') : formatted)
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

  html(string: string | undefined, values = {}, killWidows = false, removeLineBreaks = false) {
    if (!string) return ''

    let html = this.parse(string, values, removeLineBreaks) || ''

    if (killWidows) {
      const texts = html.split(/<[^>]*>/g)
      texts.forEach((text) => {
        const n = 10 // minimum character count for the final word
        const line = text.replace(/\s/g, ' ')
        const chunk = line.substr(-n)
        const fixed =
          line.substr(0, line.length - chunk.length) +
          chunk.replace(/(\s+$)|\s/g, function (_, $1) {
            // keep the last space of the chunk, replace the others
            return $1 ? $1 : '&nbsp;'
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
    const camel = this.camel(string as string)
    return (camel.charAt(0).toUpperCase() + camel.slice(1)) as T
  }
}

const copy = new Copy()

export default copy
