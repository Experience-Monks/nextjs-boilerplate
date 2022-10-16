import React, { FC, ReactElement, SVGProps } from 'react';
import { storiesOf } from '@storybook/react';

type SvgComponent = (props: SVGProps<SVGElement>) => ReactElement<{}, string>;

let icons: { class: SvgComponent; name: string }[] = [];

const req = require.context('../../src/components/svgs', false, /^.\/.*svg$/);

req.keys().forEach((key) => {
  const name = key.replace('./', '');
  const Svg = req(key).default as SvgComponent;
  icons.push({
    class: Svg,
    name
  });
});

icons = icons.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));

interface SvgCatalogProps {
  viewbox: boolean;
  color: string;
}
const SvgCatalog: FC<SvgCatalogProps> = ({ viewbox, color }) => {
  return (
    <div style={{ width: '100%', padding: '10px', textAlign: 'center' }}>
      {icons.map((icon, i) => {
        return (
          <div
            key={i}
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
        );
      })}
    </div>
  );
};

storiesOf(`intro/SVG`, module).add('CATALOG', (args: unknown) => <SvgCatalog {...(args as SvgCatalogProps)} />, {
  args: { viewbox: true, color: '#000000' },
  argTypes: { color: { control: { type: 'color' } } }
});

icons.forEach((icon) => {
  storiesOf(`intro/SVG`, module).add(
    icon.name,
    (args: unknown) => {
      const { viewbox, color } = args as SvgCatalogProps;
      return (
        <icon.class
          style={{
            width: '90vw',
            height: '90vh',
            border: viewbox ? '1px dashed magenta' : 'none',
            color: color
          }}
        />
      );
    },
    {
      args: { viewbox: false, color: '#000000' },
      argTypes: { color: { control: { type: 'color' } } }
    }
  );
});
