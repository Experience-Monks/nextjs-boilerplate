import React, { FC, useEffect, useLayoutEffect, useMemo } from 'react'
import { StoryFn } from '@storybook/react'
import css from './Eases.module.scss'
import { gsap } from 'gsap'
import { customEases } from '@/motion/eases'

export default { title: 'motion/Eases' }

const size = 300
const gridSize = size / 10

function cubicBezierToSVGPath(bezierString = '', width = size, height = size) {
  const [x1, y1, x2, y2] = bezierString.split(',').map(Number)
  return `M0,${height} C${x1 * width},${height - y1 * height} ${x2 * width},${height - y2 * height} ${width},${0}`
}

const Eases: FC<{ duration: number }> = ({ duration }) => {
  useEffect(() => {
    const timelines = customEases.map(({ name }) => {
      const timeline = gsap
        .timeline({ repeat: -1, yoyo: true, repeatDelay: 1, defaults: { ease: name } })
        .to(`.dot-vertical-${name}`, { duration: duration, y: -size }, 0)
        .fromTo(`.line-vertical-${name}`, { scaleY: 0 }, { duration: duration, scaleY: 1 }, 0)
        .fromTo(`.line-horizontal-${name}`, { scaleX: 0 }, { duration: duration, scaleX: 1 }, 0)

      return timeline
    })

    return () => {
      timelines?.forEach((timeline) => timeline.kill())
    }
  }, [duration])

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

      <div
        className={css.eases}
        style={
          {
            '--size': `${size}px`
          } as React.CSSProperties
        }
      >
        {customEases.map(({ name, description, ease }, index) => {
          const path = cubicBezierToSVGPath(ease)
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
                  <path className={css.mainPath} id={`path-${name}`} d={path} />
                </svg>
                <div className={css.vertical}>
                  <p>Value</p>
                  <div className={`background`}></div>
                  <div className={`dot dot-vertical-${name}`}></div>
                  <div className={`line line-vertical-${name}`}></div>
                </div>
                <div className={css.horizontal}>
                  <p>Progress</p>
                  <div className={`background`}></div>
                  <div className={`line line-horizontal-${name}`}></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const Default: StoryFn<{ duration: number }> = (args) => <Eases {...args} />

Default.args = {
  duration: 4
}

Default.parameters = {}
