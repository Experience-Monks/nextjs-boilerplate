# Copy Management

## A single source of truth: `./src/data/content.json`

A very good practice is to have all content grouped in a single source of truth. This allow us to change them quickly and prevents wasting time hunting individual copies through components when we need to make adjustments.  
Also, it allows us to send the entire json file for translation or corrections when required, making our life easier and more organized in the end of the day. Switching to a CMS in the future will also be much easier, since we will most likely just need to change the data source.

## Copy injection flow

That is why it is important to **never** import content.json inside our components. Instead, import it in your route files (`./src/pages/*`) and inject only the required content through the `getStaticProps()` method.

For instance, considering this content on `content.json`:

```json
{
  "common": {
    "play": "play",
    "pause": "pause",
    "close": "close",
    "screenRotate": {
      "title": "Please rotate\nyour device"
    }
  },
  "pageLanding": {
    "head": {...}
    },
    "body": {
      "title": "Landing Page"
    }
  }
}

```

We could inject the copy this way inside our route file:

```tsx
import { GetStaticProps } from 'next'

import strings from '@/data/content.json'

import PageLanding, { PageLandingProps } from '@/components/PageLanding/PageLanding'

export const getStaticProps: GetStaticProps<PageLandingProps> = async () => {
  return {
    props: {
      head: strings.pageLanding.head,
      common: strings.common,
      strings: strings.pageLanding.body
    }
  }
}

export default PageLanding
```

Note the PageLanding component will receive only the pageLanding content as props.
It will then forward the received content to child components. This allow us to have a single entry point for all the copy that can be easily changed in the future to a CMS or any other data source.

```mermaid
  graph TD;
  data/content.json-->pages/index.tsx;
      pages/index.tsx-->components/Layout;
      components/Layout-->components/PageLanding;
      components/Layout-->components/ScreenRotate;
      components/Layout-->components/ScreenNoScript;
      components/PageLanding-->components/A;
      components/PageLanding-->components/B;
      components/B-->components/C;
      components/B-->components/D;
      components/ScreenRotate-->..;
      components/ScreenNoScript-->...;
```

## &nbsp;

## Powerful copy with less typing!

We have a very useful util for handling copy at `@/utils/copy.ts`. It facilitates content handling, performs xss cleanups and allows us to interpolate values on every string. For example, lets consider we have this copy in our content.json:

```json
{
  "hello": "Hi! {name}!\nHow are you?\nFancy for a {meal}?"
}
```

We could implement it inside our components like:

```html
<h1 {...copy.html(content.hello, {name: 'John Doe', meal: 'drink'})} />
```

It would result in something like:

```html
<h1 dangerouslySetInnerHTML={{ __html: 'Hello John Doe!<br />How are you?<br />Fancy for a drink?' }} />
```

Check the `./src/utils/copy.ts` implementation for more details.
