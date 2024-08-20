function addComponentFiles(name, templatePrefix) {
  const path = `src/components/${name}`
  const templ = `scripts/templates/${templatePrefix}`
  return [
    { type: 'add', path: `${path}/index.ts`, templateFile: `${templ}.index.ts.hbs` },
    { type: 'add', path: `${path}/${name}.controller.tsx`, templateFile: `${templ}.controller.tsx.hbs` },
    { type: 'add', path: `${path}/${name}.module.scss`, templateFile: `${templ}.module.scss.hbs` },
    { type: 'add', path: `${path}/${name}.stories.tsx`, templateFile: `${templ}.stories.tsx.hbs` },
    { type: 'add', path: `${path}/${name}.view.tsx`, templateFile: `${templ}.view.tsx.hbs` }
  ]
}

module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  const pascalCase = plop.getHelper('pascalCase')
  const camelCase = plop.getHelper('camelCase')

  plop.setGenerator('component', {
    description: 'create an src/component/{name}/{name}.* component files',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Type the component name:'
      },
      {
        type: 'confirm',
        name: 'forwardRef',
        message: 'Do you want to add forwardRef?',
        default: true
      },
      {
        type: 'confirm',
        name: 'transitionPresence',
        message: 'Include transitionPresence animations?',
        default: false
      },
      {
        type: 'confirm',
        name: 'imperativeHandle',
        message: 'Include useImperativeHandle() hook?',
        default: false
      }
    ],
    actions: [...addComponentFiles('{{titleCase name}}', 'component')]
  })

  plop.setGenerator('page', {
    description: 'create an src/component/Page{name}/Page{name}.* component files',
    prompts: [
      { type: 'input', name: 'name', message: 'Type the page name:' },
      {
        type: 'confirm',
        name: 'generateRoute',
        message: 'Generate src/pages/ route?',
        default: true
      }
    ],
    actions: [
      ...addComponentFiles('Page{{titleCase name}}', 'page'),
      {
        type: 'modify',
        path: 'src/data/content.json',
        transform: (template, data) => {
          const content = JSON.parse(template)
          content.pages[camelCase(data.name)] = {
            head: { title: pascalCase(data.name), description: '' },
            body: { title: pascalCase(data.name) }
          }
          return JSON.stringify(content, null, 2)
        }
      },
      {
        type: 'add',
        path: 'src/pages/{{kebabCase name}}.ts',
        templateFile: 'scripts/templates/route.ts.hbs',
        skip: (data) => (data.generateRoute ? false : 'Skipped route generation')
      }
    ]
  })

  plop.setGenerator('route', {
    description: 'create a src/pages route',
    prompts: [{ type: 'input', name: 'name', message: 'Type the route name:' }],
    actions: [{ type: 'add', path: 'src/pages/{{kebabCase name}}.ts', templateFile: 'scripts/templates/route.ts.hbs' }]
  })

  plop.setGenerator('api', {
    description: 'create an src/pages/api route',
    prompts: [{ type: 'input', name: 'name', message: 'Type the api name:' }],
    actions: [
      { type: 'add', path: 'src/pages/api/{{kebabCase name}}.ts', templateFile: 'scripts/templates/api.ts.hbs' }
    ]
  })
}
