const { stat, readFile, writeFile } = require('fs/promises');
const path = require('path');

const mkdirp = require('mkdirp');
const maxstache = require('maxstache');
const chalk = require('chalk');

const argv = require('minimist')(process.argv.slice(2));

// error handle when receiving an invalid type
if (!argv._.length === 0) {
  console.error(chalk.red(`Error: Must give a ${argv.type} name to create.`));
  process.exit(0);
}

const cwd = process.cwd();

// rename target template name
function formatComponentName(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// write page/component templates
async function writeTemplate(name, input, output) {
  try {
    let str = await readFile(input, { encoding: 'utf8' });
    str = maxstache(str, {
      name: name,
      depth: '../'
    });

    try {
      await writeFile(output, str);
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    console.error(err);
  }
}

//
async function write(dir, name) {
  const made = await mkdirp(dir);

  if (made) {
    console.log(`Path ${path.relative(cwd, dir)} is created!`);
  }

  const files = [];

  if (argv.type === 'page') {
    files.push(writeTemplate(name, path.resolve(__dirname, 'templates/page/page.tsx'), path.resolve(dir, `index.tsx`)));
    files.push(
      writeTemplate(name, path.resolve(__dirname, 'templates/page/page.scss'), path.resolve(dir, `index.module.scss`))
    );
  } else if (argv.type === 'api') {
    files.push(writeTemplate(name, path.resolve(__dirname, 'templates/api/api.ts'), path.resolve(dir, `${name}.tsx`)));
  } else {
    files.push(
      writeTemplate(
        name,
        path.resolve(__dirname, 'templates/component/component.tsx'),
        path.resolve(dir, `${name}.tsx`)
      )
    );
    files.push(
      writeTemplate(
        name,
        path.resolve(__dirname, 'templates/component/component.stories.tsx'),
        path.resolve(dir, `${name}.stories.tsx`)
      )
    );
    files.push(
      writeTemplate(
        name,
        path.resolve(__dirname, 'templates/component/component.scss'),
        path.resolve(dir, `${name}.module.scss`)
      )
    );
  }

  return Promise.all(files)
    .then(() => {
      console.log(`Created new ${name} ${argv.type} at ${dir}`);
    })
    .catch((err) => console.error(err));
}

//
argv._.forEach(async (t) => {
  const names = [];

  if (argv.type === 'component') {
    t.split('/').forEach((c) => names.push(formatComponentName(c)));
  } else {
    // page and api
    t.split('/').forEach((c) => names.push(c));
  }

  names.forEach(async (name, index) => {
    const destName = names.slice(0, index + 1).join('/');
    let dir = null;

    if (argv.type === 'page') {
      dir = path.resolve(__dirname, `../src/${argv.type}s/${destName}`);
    } else if (argv.type === 'api') {
      dir = path.resolve(__dirname, `../src/pages/api`);
    } else {
      // component
      dir = path.resolve(__dirname, `../src/components/${destName}`);
    }

    try {
      await write(dir, name);
    } catch (err) {
      console.error(err);
    }
  });
});
