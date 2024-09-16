import type { FC } from 'react'
import type { StoryFn } from '@storybook/react'
import type { EaseDeclaration } from './eases'

import { useEffect, useState } from 'react'
import { BezierCurveEditor } from 'react-bezier-curve-editor'
import { gsap } from 'gsap'

import css from './eases.module.scss'

import { copy } from '@/utils/copy'

import { customEases, favouriteEases, standardEases } from './eases'

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
  const [bezierEditor, setBezierEditor] = useState(false)
  const [easeBezier, setEaseBezier] = useState<{ [key: string]: EaseDeclaration['bezier'] }>(
    eases.reduce<{ [key: string]: EaseDeclaration['bezier'] }>((acc, ease) => {
      const bezier = ease.bezier || ease.ease.split(',').map((v) => parseFloat(v))
      acc[ease.name] = (bezier.length === 4 ? bezier : [0, 0, 1, 1]) as EaseDeclaration['bezier']
      return acc
    }, {})
  )

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
        <pre>motion/eases.tsx</pre>
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

      <div className={css.debug}>
        <button value={selectedEase} onClick={() => setBezierEditor((c) => !c)}>
          Toggle bezier editor (use it to get approximate cubic bezier values)
        </button>
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
                  {bezierEditor ? (
                    <BezierCurveEditor
                      className={css.editor}
                      size={size}
                      outerAreaSize={75}
                      rowColor="transparent"
                      innerAreaColor="transparent"
                      outerAreaColor="transparent"
                      curveLineColor="red"
                      strokeWidth={1}
                      value={easeBezier[name]}
                      onChange={(value) =>
                        setEaseBezier((c) => ({
                          ...c,
                          [name]: value.map((v) => Math.floor(v * 1000) / 1000) as EaseDeclaration['bezier']
                        }))
                      }
                    />
                  ) : null}
                  <div className={css.vertical}>
                    <p>Value</p>
                    <div className="background"></div>
                    <div className={`dot dot-vertical-${copy.kebab(name)}`}></div>
                    <div className={`line line-vertical-${copy.kebab(name)}`}></div>
                  </div>
                  <div className={css.horizontal}>
                    <p>Progress</p>
                    <div className="background"></div>
                    <div className={`line line-horizontal-${copy.kebab(name)}`}></div>
                  </div>
                </div>
                {bezierEditor ? (
                  <div className={css.bezier}>bezier: {JSON.stringify(easeBezier[name], undefined, 2)}</div>
                ) : null}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export const Standard: StoryFn<{ duration: number }> = (args) => (
  <Eases {...args} eases={Object.values(standardEases)} />
)

Standard.args = {
  duration: 2
}

Standard.parameters = {}

export const Favourite: StoryFn<{ duration: number }> = (args) => (
  <Eases {...args} eases={Object.values(favouriteEases)} />
)

Favourite.args = {
  duration: 2
}

Favourite.parameters = {}

export const Custom: StoryFn<{ duration: number }> = (args) => <Eases {...args} eases={Object.values(customEases)} />

Custom.args = {
  duration: 2
}

Custom.parameters = {}
