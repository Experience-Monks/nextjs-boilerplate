import React, { FC, useEffect, useRef } from 'react';
import { storiesOf } from '@storybook/react';
import gsap from 'gsap';

import css from './Effects.module.scss';

type FX = { name: string; defaults: {} };

const effects: FX[] = [];

const req = require.context('../../src/effects', true, /^.\/.*ts$/);
req.keys().forEach((key) => {
  if (!key.startsWith('_')) {
    const effect = req(key).default as FX;
    if (effect) {
      gsap.registerEffect(effect);
      effects.push(effect);
    }
  }
});

interface TemplateProps {
  effect: string;
  content: string;
  options: object;
}
const Template: FC<TemplateProps> = ({ effect, content, options }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const timeline = gsap.timeline()[`${effect}`](ref.current, options, 0.4);
    return () => {
      timeline.kill();
    };
  }, [effect, content, options]);
  return (
    <div
      key={content}
      className={css.root}
      style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '10px', textAlign: 'center' }}
    >
      <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} ref={ref} />
    </div>
  );
};

effects.forEach((fx) => {
  storiesOf(`intro/Effects`, module).add(
    fx.name,
    (args: unknown) => {
      const props = args as unknown as { content: string; options: object };
      return <Template effect={fx.name} content={props.content} options={props.options} />;
    },
    {
      args: {
        options: { ...fx.defaults, duration: 2 },
        content: "The relentless pursuit of better.\nWe create modern experiences\nfor tomorrow's brands."
      },
      argTypes: {
        options: { control: { type: 'object' } },
        content: { control: { type: 'text' } }
      }
    }
  );
});
