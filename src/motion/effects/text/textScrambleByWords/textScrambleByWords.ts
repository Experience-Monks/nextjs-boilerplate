import { gsap } from 'gsap'
import ScrambleTextPlugin from 'gsap/dist/ScrambleTextPlugin'

import { effectTimeline } from '@/motion/core/effect-timeline'
import { SafeSplitText } from '@/motion/core/safe-split-text'

gsap.registerPlugin(ScrambleTextPlugin)

const setup = (target: Element, config: Parameters<CustomEffects['textScrambleByWords']>[1] = {}): SafeSplitText => {
  const element = (target as unknown as HTMLElement[])[0]
  const split = new SafeSplitText(element, { type: 'words,chars' })

  if (config.wipe?.direction) {
    split.words.forEach((word) => {
      const wipe = document.createElement('div')
      wipe.className = 'wipe'
      word.append(wipe)
      gsap.set(word, { position: 'relative' })
      gsap.set(wipe, {
        inset: '0',
        scaleX: 1,
        transformOrigin: config.wipe!.direction === 'left' ? 'center left' : 'center right',
        backgroundColor: 'currentColor',
        position: 'absolute'
      })
    })
  }

  return split
}

const effect: CustomEffectConfig = {
  name: 'textScrambleByWords',
  effect: (target, config = {}) => {
    if (config.immediateRender) setup(target, config)

    return effectTimeline(config.duration!, config.reversed!, () => {
      const split = setup(target, config)
      const duration = 1
      const timeline = gsap.timeline({ paused: true })
      for (let i = 0; i < split.words.length; i++) {
        const word = split.words[i] as HTMLDivElement
        const wipe = word.querySelector('.wipe')
        const chars = [...word.children]
        timeline.to(
          config.wipe?.direction === 'left' ? chars.reverse() : chars,
          {
            duration,
            scrambleText: { text: config.text!, chars: config.chars!, speed: config.speed! },
            stagger: {
              each: duration * 0.01,
              onStart() {
                const el = (this as gsap.TweenVars).targets()[0]
                gsap.set(el, { width: gsap.getProperty(el, 'width', 'rem') })
              }
            }
          },
          i * config.offset!
        )

        if (wipe) {
          timeline.to(
            wipe,
            {
              duration: config.wipe?.duration || duration * 0.6,
              ease: config.wipe?.ease || 'expo.out',
              scaleX: 0
            },
            i * config.offset!
          )
        }
      }
      return timeline
    })
  },
  defaults: {
    duration: +(gsap.defaults().duration || 1),
    offset: 0.1,
    text: '{original}',
    chars: 'upperAndLowerCase',
    speed: 1,
    immediateRender: false
  },
  extendTimeline: true
}

export default effect
