import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

interface InputOptions {
  name: string;
}

export function smartView(options: InputOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    console.log({options});
    return tree;
  };
}
