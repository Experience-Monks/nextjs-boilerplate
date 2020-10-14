const fs = require('fs');
const path = require('path');

const mkdirp = require('mkdirp');
const maxstache = require('maxstache');
const chalk = require('chalk');

const argv = require('minimist')(process.argv.slice(2), {
  boolean: ['page']
});

let type;
if (argv.page) {
  type = 'page';
} else {
  type = 'component';
}

function formatComponentName(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

let name = argv._[0];
if (!name) {
  console.error(chalk.red(`Error: Must give a ${type} name to create.`));
  process.exit(0);
}

name = formatComponentName(name);

let targetFolder = argv._[1];
targetFolder = targetFolder ? `${formatComponentName(targetFolder)}/` : '';

const cwd = process.cwd();
const dir =
  type === 'page'
    ? path.resolve(__dirname, `../src/${type}s/` + argv._[0].toLowerCase())
    : path.resolve(__dirname, [`../src/components/`, targetFolder, name].join(''));

fs.stat(dir, (err, stat) => {
  if (err) {
    write();
  } else {
    console.log(chalk.red(`Path at ${path.relative(cwd, dir)} already exists!`));
  }
});

function write() {
  mkdirp(dir).then((made) => {
    if (!made) throw made;

    const files =
      type === 'page'
        ? [
            template(path.resolve(__dirname, 'templates/page/Page.js'), path.resolve(dir, `index.js`)),
            template(path.resolve(__dirname, 'templates/page/Page.scss'), path.resolve(dir, `index.module.scss`))
          ]
        : [
            template(path.resolve(__dirname, 'templates/' + type + '/Component.js'), path.resolve(dir, `${name}.js`)),
            template(
              path.resolve(__dirname, 'templates/' + type + '/Component.stories.js'),
              path.resolve(dir, `${name}.stories.js`)
            ),
            template(
              path.resolve(__dirname, 'templates/' + type + '/Component.scss'),
              path.resolve(dir, `${name}.module.scss`)
            )
          ];

    Promise.all(files)
      .then(() => {
        console.log(`Created new ${name} ${type} at ${dir}`);
      })
      .catch((err) => console.error(err));
  });
}

function template(input, output) {
  const data = {
    name: name,
    depth: targetFolder ? '../' : ''
  };

  return new Promise((resolve, reject) => {
    fs.readFile(input, 'utf8', (err, str) => {
      if (err) return reject(err);
      str = maxstache(str, data);
      fs.writeFile(output, str, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  });
}
