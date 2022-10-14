module.exports = (plop) => {
  // page
  plop.setGenerator('page', {
    description: 'Generator for a react page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Your page name'
      }
    ],
    actions: [
      {
        type: 'add',
        path: './src/pages/{{name}}.tsx',
        templateFile: 'scripts/templates/page/index.tsx.hbs'
      },
      {
        type: 'add',
        path: './src/pages/index.module.scss',
        templateFile: 'scripts/templates/page/index.module.scss.hbs'
      }
    ]
  });

  plop.setGenerator('component', {
    description: 'Generator for a react component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Your component name (use UpperCamelCase)'
      }
    ],
    actions: [
      {
        type: 'add',
        path: './src/components/{{name}}/{{name}}.tsx',
        templateFile: 'scripts/templates/page/index.tsx.hbs'
      },
      {
        type: 'add',
        path: './src/components/{{name}}/{{name}}.module.scss',
        templateFile: 'scripts/templates/page/index.tsx.hbs'
      },
      {
        type: 'add',
        path: './src/components/{{name}}/{{name}}.tsx',
        templateFile: 'scripts/templates/page/index.tsx.hbs'
      }
    ]
  });

  plop.setGenerator('api', {
    description: 'Generator for a react page',
    prompts: [], // array of inquirer prompts
    actions: [] // array of actions
  });
};
