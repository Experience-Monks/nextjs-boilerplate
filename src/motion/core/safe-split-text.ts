import gsap from 'gsap'
import SplitText from 'gsap/dist/SplitText'

import { ResizeService } from '@/services/resize.service'

import { randomString } from '@/utils/basic-functions'

gsap.registerPlugin(SplitText)

const cache: { [key: string]: SplitText | null } = {}

const attrId = 'data-safe-split-text'

export class SafeSplitText extends SplitText {
  id: string
  targets: Element[]

  constructor(target: Element | Element[], vars?: SplitText.Vars, setAriaHidden = true) {
    super(
      // https://github.com/microsoft/TypeScript/issues/8277
      (() => {
        const targets = [target].flat().filter(Boolean)
        const id = targets[0]?.getAttribute(attrId)
        if (id) cache[id]?.revert()
        return target
      })(),
      { linesClass: 'split-line', wordsClass: 'split-word', charsClass: 'split-char', ...vars }
    )

    const targets = [target].flat().filter(Boolean)
    const id = targets[0]?.getAttribute(attrId) || randomString()

    this.targets = targets

    cache[id] = this

    this.id = id
    this.targets = targets
    this.targets.forEach((t) => {
      t.setAttribute(attrId, this.id)
    })

    if (setAriaHidden) {
      if (this.chars?.length) gsap.set(this.chars, { attr: { 'aria-hidden': 'true' } })
      if (this.words?.length) gsap.set(this.words, { attr: { 'aria-hidden': 'true' } })
      if (this.lines?.length) gsap.set(this.lines, { attr: { 'aria-hidden': 'true' } })
    }

    ResizeService.listen(this.onResize)
  }

  onResize = () => {
    this.revert()
  }

  revert = (): void => {
    this.targets.forEach((t) => {
      t.removeAttribute(attrId)
    })
    ResizeService.dismiss(this.onResize)
    cache[this.id] = null
    super.revert()
  }
}
