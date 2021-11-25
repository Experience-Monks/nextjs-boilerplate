// eslint-disable-next-line @typescript-eslint/no-explicit-any
const icons: { Component: any; name: string }[] = [];

const req = require.context('./', false, /^.\/.*svg$/);

req.keys().forEach((key) => {
  const name = key.replace('./', '');
  const Svg = req(key).default;
  icons.push({
    Component: Svg,
    name
  });
});

type Props = {
  color: string;
  viewbox: boolean;
};

const SvgCatalog = ({ color, viewbox }: Props) => {
  return (
    <div style={{ position: 'relative', width: '100%', padding: '10px', textAlign: 'center' }}>
      {icons
        .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
        .map(({ Component, name }, i) => (
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
              <Component style={{ width: '100px', fill: 'currentColor', display: 'block', overflow: 'visible' }} />
            </div>
            <div
              style={{
                fontSize: '12px',
                marginTop: '10px',
                wordBreak: 'break-all'
              }}
            >
              {name}
            </div>
          </div>
        ))}

      <p
        style={{
          fontSize: '11px',
          position: 'absolute',
          bottom: '0',
          left: '0'
        }}
      >
        Svg Catalog created by @Edgard
      </p>
    </div>
  );
};

export default { title: 'etc/SVG' };

export const Catalog = (args: Props) => <SvgCatalog {...args} />;

Catalog.args = { viewbox: true, color: '#000000' };
Catalog.argTypes = { color: { control: { type: 'color' } } };
