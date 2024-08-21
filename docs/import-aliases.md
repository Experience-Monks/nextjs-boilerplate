# Import Aliases

We've set up import aliases to simplify file referencing:

- `@/` represents the `./src/` folder
- `#/` represents the `./generated/` folder

## Usage Examples

### In TypeScript/JavaScript:

```tsx
import { Svgs } from '#/svg-imports'
import { print } from '@/utils/print'
```

These imports resolve to:

- `./generated/svg-imports.ts`
- `./src/utils/print`

### In SCSS:

```scss
src: url('~@/assets/fonts/ShopifySans/ShopifySans-Regular.woff2');
```
