import { gsap } from 'gsap'
import ScrambleTextPlugin from 'gsap/dist/ScrambleTextPlugin'

import { effectTimeline } from '@/motion/core/effect-timeline'
import { SafeSplitText } from '@/motion/core/safe-split-text'

gsap.registerPlugin(ScrambleTextPlugin)

const setup = (target: Element, config: Parameters<CustomEffects['textScrambleByChars']>[1] = {}): SafeSplitText[] => {
  const element = (target as unknown as HTMLElement[])[0]
  const splits: SafeSplitText[] = []

  const split1 = new SafeSplitText(element, { type: 'words,chars' })
  splits.push(split1)

  if (config.wipe?.direction) {
    const split2 = new SafeSplitText(split1.chars, { type: 'chars' })
    splits.push(split2)

    split1.chars.forEach((char) => {
      const wipe = document.createElement('div')
      wipe.className = 'wipe'
      char.append(wipe)
      gsap.set(char, { position: 'relative' })
      gsap.set(wipe, {
        transformOrigin: config.wipe!.direction === 'left' ? 'center left' : 'center right',
        backgroundColor: 'currentColor',
        position: 'absolute',
        scaleX: 1,
        inset: '0'
      })
    })
  }

  return splits
}

const effect: CustomEffectConfig = {
  name: 'textScrambleByChars',
  effect: (target, config = {}) => {
    if (config.immediateRender) setup(target, config)

    return effectTimeline(config.duration!, config.reversed!, () => {
      const duration = 1
      const timeline = gsap.timeline({ paused: true })
      if (config.wipe?.direction) {
        const [split1, split2] = setup(target, config)
        for (let i = 0; i < split2.chars.length; i++) {
          const char = split2.chars[i] as HTMLDivElement
          const wipe = split1.chars[i].querySelector('.wipe')
          timeline
            .to(
              char,
              {
                duration,
                scrambleText: { text: config.text!, chars: config.chars!, speed: config.speed! },
                onStart() {
                  const el = (this as gsap.TweenVars).targets()[0]
                  gsap.set(el, { width: gsap.getProperty(el, 'width', 'rem') })
                }
              },
              i * config.offset!
            )
            .to(
              wipe,
              {
                duration: config.wipe?.duration || duration * 0.6,
                ease: config.wipe?.ease || 'expo.out',
                scaleX: 0
              },
              i * config.offset!
            )
        }
      } else {
        const [split] = setup(target, config)
        timeline.to(split.chars, {
          duration,
          scrambleText: { text: config.text!, chars: config.chars!, speed: config.speed! },
          stagger: {
            each: duration * config.offset!,
            onStart() {
              const el = (this as gsap.TweenVars).targets()[0]
              gsap.set(el, { width: gsap.getProperty(el, 'width', 'rem') })
            }
          }
        })
      }
      return timeline
    })
  },
  defaults: {
    duration: +(gsap.defaults().duration || 1),
    offset: 0.01,
    text: '{original}',
    chars: 'upperAndLowerCase',
    speed: 1,
    immediateRender: false
  },
  extendTimeline: true
}

export default effect
