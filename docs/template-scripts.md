# Template scripts

We are using [plop](https://plopjs.com/) to generate files from templates.
You can just run `npm run generate` and follow the instructions, or use the following commands:

- Create a React component:

  ```bash
  $ npm run generate component [ComponentName]
  ```

- Create a page component (the generated files will be automatically prefixed by "Page")

  ```bash
  $ npm run generate page [PageName]
  ```

- Create a new route (use the same name used for generating the page component)
  ```bash
  $ npm run generate route [PageName]
  ```
