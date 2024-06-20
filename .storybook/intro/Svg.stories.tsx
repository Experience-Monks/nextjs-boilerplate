import type { FC, ReactElement, SVGProps } from 'react'
import type { StoryFn } from '@storybook/react'

import React from 'react'

export default { title: 'intro/SVG' }

type SvgComponent = (props: SVGProps<SVGElement>) => ReactElement<object, string>

let icons: { class: SvgComponent; name: string }[] = []

const req = require.context('../../src/svgs', false, /^.\/.*svg$/iu)

req.keys().forEach((key) => {
  const name = key.replace('./', '')
  const Svg = req(key).default as SvgComponent
  icons.push({
    class: Svg,
    name
  })
})

icons = icons.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))

interface SvgCatalogProps {
  viewbox: boolean
  color: string
}
const SvgCatalog: FC<SvgCatalogProps> = ({ viewbox, color }) => {
  return (
    <div style={{ width: '100%', padding: '10px', textAlign: 'center' }}>
      {icons.map((icon) => {
        return (
          <div
            key={icon.name}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '150px',
              padding: '20px',
              verticalAlign: 'middle'
            }}
          >
            <div
              style={{
                border: viewbox ? '1px dashed magenta' : 'none',
                color
              }}
            >
              <icon.class style={{ width: '100px' }} />
            </div>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                letterSpacing: '0',
                marginTop: '10px'
              }}
            >
              {icon.name}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export const Catalog: StoryFn<SvgCatalogProps> = (args) => <SvgCatalog {...args} />

Catalog.args = {
  viewbox: true,
  color: '#000000'
}

Catalog.argTypes = {
  color: { control: { type: 'color' } }
}
