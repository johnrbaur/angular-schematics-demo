import {
  chain,
  externalSchematic,
  Rule,
} from '@angular-devkit/schematics';

interface InputOptions {
  name: string;
}

export function smartView(options: InputOptions): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'component', {
      name: options.name,
      style: 'scss',
    }),
    externalSchematic('@schematics/angular', 'component', {
      name: `${options.name}-view`,
      style: 'scss',
    }),
  ]);
}
