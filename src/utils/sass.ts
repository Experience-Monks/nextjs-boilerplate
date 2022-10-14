import * as vars from '../styles/export-vars.module.scss';

const sassVars = vars.default as unknown as { [key: string]: string };

function getVariables(prefix: string) {
  return Object.keys(sassVars)
    .filter((key) => key.startsWith(prefix))
    .reduce((obj, key) => {
      obj[key.split('-')[1]] = sassVars[key];
      return obj;
    }, {} as { [key: string]: string });
}

export default {
  layout: getVariables('layout'),
  color: getVariables('color'),
  all: sassVars
};
