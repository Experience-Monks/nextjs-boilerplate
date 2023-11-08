import React, { FC, useEffect, useState } from 'react'
import { StoryFn } from '@storybook/react'
import { gsap } from 'gsap'

import css from './eases.module.scss'

import copy from '@/utils/copy'

import { customEases, EaseDeclaration, favouriteEases, standardEases } from './eases'

export default { title: 'motion/Eases' }

const size = 300
const gridSize = size / 10

function generatePath(ease = '', width = size, height = size) {
  const helper = { value: 0 }
  const tl = gsap.timeline({ paused: true }).to(helper, { value: 1, ease })
  let path = `M0,${height} `
  for (let i = 0; i < 300; i++) {
    tl.progress(i / 300)
    const x = i / 300
    const y = helper.value
    path += `L ${Math.floor(x * width * 100) / 100} ${Math.floor((height - y * height) * 100) / 100} `
  }
  return path
}

const Eases: FC<{ eases: EaseDeclaration[]; duration: number }> = ({ eases, duration }) => {
  const [selectedEase, setSelectedEase] = useState('')

  useEffect(() => {
    const timeline = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 1, defaults: {} })
    eases
      .filter(({ name }) => name === selectedEase || selectedEase === '')
      .forEach(({ name }) => {
        timeline
          .fromTo(`.dot-vertical-${copy.kebab(name)}`, { y: 0 }, { duration, y: -size, ease: name }, 0)
          .fromTo(`.line-vertical-${copy.kebab(name)}`, { scaleY: 0 }, { ease: name, duration, scaleY: 1 }, 0)
          .fromTo(`.line-horizontal-${copy.kebab(name)}`, { scaleX: 0 }, { ease: name, duration, scaleX: 1 }, 0)
      })
    return () => {
      timeline.kill()
    }
  }, [eases, duration, selectedEase])

  return (
    <div className={css.root}>
      <div className={css.instructions}>
        <p>Eases location:</p>
        <pre>{`motion/eases.tsx`}</pre>
      </div>

      <div className={css.instructions}>
        <p>Usage:</p>
        <pre>{`gsap.to(target, { ease: '<name>' })`}</pre>
      </div>

      <div className={css.instructions}>
        <p>Select an ease:</p>
        <select value={selectedEase} onChange={(e) => setSelectedEase(e.target.value)}>
          <option value="">Show all</option>
          {eases.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div
        className={css.eases}
        style={
          {
            '--size': `${size}px`
          } as React.CSSProperties
        }
      >
        {eases
          .filter(({ name }) => name === selectedEase || selectedEase === '')
          .map(({ name, description, ease }, index) => {
            const path = generatePath(ease)

            return (
              <div className={css.curveContainer} key={index}>
                <div className={css.titleContainer}>
                  <pre>{name}</pre>
                  {description ? <p>{description}</p> : null}
                </div>
                <div className={css.graphContainer}>
                  <svg className={css.graph} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    <defs>
                      <pattern id="grid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
                        <path
                          width={size}
                          height={size}
                          className={css.grid}
                          d={`M ${gridSize} 0 L 0 0 0 ${gridSize} ${gridSize} ${gridSize} M 0 ${gridSize} L ${gridSize} ${gridSize} M ${gridSize} 0 L ${gridSize} ${gridSize}`}
                          fill="none"
                        />
                      </pattern>
                    </defs>
                    <rect width={size} height={size} fill="url(#grid)" />
                    <path className={css.mainPath} id={`path-${copy.kebab(name)}`} d={path} />
                  </svg>
                  <div className={css.vertical}>
                    <p>Value</p>
                    <div className={`background`}></div>
                    <div className={`dot dot-vertical-${copy.kebab(name)}`}></div>
                    <div className={`line line-vertical-${copy.kebab(name)}`}></div>
                  </div>
                  <div className={css.horizontal}>
                    <p>Progress</p>
                    <div className={`background`}></div>
                    <div className={`line line-horizontal-${copy.kebab(name)}`}></div>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export const Standard: StoryFn<{ duration: number }> = (args) => <Eases {...args} eases={standardEases} />

Standard.args = {
  duration: 2
}

Standard.parameters = {}

export const Favourite: StoryFn<{ duration: number }> = (args) => <Eases {...args} eases={favouriteEases} />

Favourite.args = {
  duration: 2
}

Favourite.parameters = {}

export const Custom: StoryFn<{ duration: number }> = (args) => <Eases {...args} eases={customEases} />

Custom.args = {
  duration: 2
}

Custom.parameters = {}
