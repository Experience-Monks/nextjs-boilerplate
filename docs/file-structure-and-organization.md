# File Structure and Organization

Let's take a tour of our project's file structure! We've organized everything to make development smooth and intuitive.

## The Big Picture

```properties
public/
scripts/
src/
  assets/
  components/
  data/
  hooks/
  motion/
  pages/
  services/
  store/
  styles/
  svgs/
  utils/
```

Now, let's dive into each folder and see what magic happens inside!

## `public/`: Your Static Asset Showcase

This is where your static files live. They'll be copied directly to the output directory at build time. Perfect for:

- Favicons
- robots.txt
- Sitemaps
- Share images

To use these files, just reference them with a simple URL:

```html
<link rel="shortcut icon" href="/common/favicons/favicon.ico" />
```

🚨 **Heads up!** Don't import files from here in your code. It'll create duplicates in the output directory.

## `scripts/`: Your Development Toolkit

Here's where we keep all our handy development scripts:

- Dev server
- Generator templates
- Shell scripts

Feel free to add your own utility scripts here!

## `src/assets/`: Binary Asset Central

This folder is for all your binary assets that need to be imported in your code. During build time, these files will be:

- Compiled
- Renamed (with a hash)
- Placed in the `/_next/static/` folder

Only add binary files here, please!

## `src/components/`: The Heart of Your React App

This is where the magic happens! Our components are the building blocks of our application, and we've set them up to be as independent and reusable as possible.

### Component Structure

Each component follows this structure:

```
Component/
  index.ts
  MyComponent.controller.tsx
  MyComponent.view.tsx
  MyComponent.stories.tsx
  MyComponent.module.scss
```

Let's break it down:

- **Index:** Exports the Controller component and its props
- **Controller:** Handles global state, router, data fetching, etc. It feeds props to the view component.
- **View:** A pure, testable component that receives props exclusively from the controller
- **Stories:** Storybook stories for the component view
- **SCSS:** The component's view styles

### Component Example

Here's a quick look at how these files work together:

#### index.ts

```tsx
export type { ControllerProps as MyComponentProps } from './MyComponent.controller'
export { Controller as MyComponent } from './MyComponent.controller'
```

#### MyComponent.controller.tsx

```tsx
import type { FC } from 'react'
import { memo } from 'react'
import { View } from './MyComponent.view'

export interface ControllerProps {
  className?: string
}

export const Controller: FC<ControllerProps> = memo((props) => {
  return <View {...props} />
})
```

#### MyComponent.view.tsx

```tsx
import type { FC } from 'react'
import type { ControllerProps } from './MyComponent.controller'
import classNames from 'classnames'
import css from './MyComponent.module.scss'

export interface ViewProps extends ControllerProps {}

export const View: FC<ViewProps> = ({ className }) => {
  return (
    <div className={classNames('MyComponent', css.root, className)}>
      <p>&lt;MyComponent /&gt;</p>
    </div>
  )
}
```

### Best Practices

To make our lives easier, let's follow these practices:

1. **Keep components decoupled**

   - Avoid global dependencies (like Router, Redux, Zustand) in the View component
   - Use the Controller for global state wiring
   - In View components, everything should come in as props and go out as callbacks

2. **Avoid component namespacing**

   - Keep all components in the `src/components` folder
   - Instead of subfolders, use prefixes to group similar components:

     ```properties
     # Bad
      components/
        buttons/
          Accept/
          Round/
          Cta/
        carousels/
          Carousel/
          Round/
          Cta/
        modals/
          Accept/

     # Good
     components/
       ButtonAccept/
       ButtonRound/
       ButtonXYZ/
       Carousel/
       CarouselRound/
       CarouselCta/
       ModalAccept/
     ```

3. **Use a common style structure**

   - In your View component:
     ```tsx
     <div className={classNames('MyComponent', css.root, className)}>
     ```
   - In your SCSS module:

     ```scss
     @import 'shared';

     .root {
       // Your styles here
     }
     ```

4. **Create comprehensive Storybook stories**

   - Ensure all components have stories with proper controls
   - They serve as documentation and make testing easier
   - Example:

   ```tsx
   import type { StoryFn } from '@storybook/react'
   import type { ViewProps } from './MyComponent.view'
   import { View } from './MyComponent.view'

   export default { title: 'components/MyComponent' }

   export const Default: StoryFn<ViewProps> = (args) => {
     return <View {...args} />
   }
   ```

Remember, treating each component as an isolated mini-application will make our overall app more maintainable and easier to test.

## `src/data/`: Your Content Hub

Here's where we keep all our configuration and string content. Think of it as the brain of your app!

```properties
src/
    data/
        content.json
        config.json
        types.ts
        ...
```

These files are the backbone of our pages, consumed at build time to populate our content.

🚨 **Pro tip:** Never import `content.json` directly inside components. It might make switching to a CMS trickier in the future. Instead, let your page components receive the required strings through Next.js `getStaticProps()` method.

Want to know more about managing your content? Check out our [Copy Management](./copy-management.md) docs!

## `src/hooks/`: Custom React Hooks Galore

```properties
src/
    hooks/
        use-layout.ts
        use-window-size.ts
        ...
```

This is your toolkit of custom React hooks. We've already stocked it with several useful ones – don't forget to explore them!

Feel free to add any new hooks you create. Who knows, your next hook might become the team's new favorite tool!

## `src/motion/`: Where Movement Comes to Life

```properties
src/
    motion/
        core/
        eases/
        ...
```

Welcome to the dance floor of your app! This is where we keep all things motion-related:

- GSAP initialization
- Custom eases
- GSAP effects
- Rive components
- Other motion-related utilities

## `src/pages/`: The Traffic Control of Your App

```properties
src/
    pages/
        _app.tsx
        _document.tsx
        index.tsx
        ...
```

This is where Next.js routing magic happens. We've purposely separated it from the React components logic for a few good reasons:

1. **Better separation of concerns:** Next.js logic often runs in NodeJS, not the browser. This separation helps avoid confusion.
2. **Prevents route pollution:** By keeping it separate, we can use proper naming conventions for our pages without risking unwanted routes.
3. **Flexibility:** Need to render different components for the same route? This structure makes it a breeze!

## `src/services/`: Your App's Utility Belt

```properties
src/
    services/
        raf.service.ts
        resize.service.ts
        ...
```

Think of services as your app's specialized task force. Each service is typically a class with a specific, well-defined purpose.

In our project, services are singleton class instances that handle common browser events like resize or requestAnimationFrame. They're great for events that many components might need to listen to, helping us avoid adding multiple event listeners for the same thing.

If you're familiar with Angular, this concept will feel right at home!

## `src/store/`: Global State Management HQ

```properties
src/
    store/
        store.ts
        navigation.slice.ts
        animation.slice.ts
        ...
```

Welcome to the brain center of your app's global state! We use [Zustand](https://github.com/pmndrs/zustand) for global state management because it's simple and performant.

Need to create a new slice of state? Use our [generator](./template-generator.md) to whip one up in no time!

## `src/styles/`: Global Style Central

```properties
src/
    styles/
        global.scss
        mixins.scss
        ...
```

This is where all your global [SASS](https://sass-lang.com/) styles live.

## `src/svgs/`: Your SVG Library

```properties
src/
    svgs/
        ArrowLeft.svg
        Logo.svg
        ...
```

SVGs are special – they're not just images, they're code! We keep them in their own folder because:

- They generate GIT diffs
- They're often compiled to React components using [SVGR](https://react-svgr.com/)
- They don't follow the same structure as regular components

Fun fact: We have a special Storybook file (`.storybook/intro/Svg.stories.tsx`) that automatically creates a catalog of all SVGs placed here.

## `src/utils/`: Your Utility Belt

Last but not least, this is where all your handy utility functions live.

And there you have it - a tour of our project structure! Happy coding! 🚀
