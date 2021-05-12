import { externalSchematic, Rule } from '@angular-devkit/schematics';

interface InputOptions {
  name: string;
}

export function smartView(options: InputOptions): Rule {
  return externalSchematic('@schematics/angular', 'component', {
    name: options.name,
    style: 'scss'
  });
}
