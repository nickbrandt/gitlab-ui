import * as chartComponents from '../charts';
import * as components from '../index';

export const gitlabComponents = { ...components, ...chartComponents };
export const gitlabChartComponents = { ...chartComponents };

export const componentValidator = (componentName) =>
  Object.keys(gitlabComponents).includes(componentName);
