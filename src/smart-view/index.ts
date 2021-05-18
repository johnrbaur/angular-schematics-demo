import {
  chain,
  externalSchematic,
  Rule,
  apply,
  url,
  applyTemplates,
  move,
  mergeWith,
  MergeStrategy,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { updateTsLintPrefixRules } from './tsconfig';

interface InputOptions {
  name: string;
  prefix?: string;
}

export function smartView(options: InputOptions): Rule {
  const prefix = options.prefix || 'app';
  const smartTemplateSource = apply(url('../../templates/smart'), [
    applyTemplates({
      classify: strings.classify,
      dasherize: strings.dasherize,
      name: options.name,
      prefix,
    }),
    move(`/src/app/${strings.dasherize(options.name)}`),
  ]);
  const viewTemplateSource = apply(url('../../templates/view'), [
    applyTemplates({
      classify: strings.classify,
      dasherize: strings.dasherize,
      name: options.name,
      prefix,
    }),
    move(`/src/app/${strings.dasherize(options.name)}-view`),
  ]);

  return chain([
    externalSchematic('@schematics/angular', 'component', {
      name: options.name,
      style: 'scss',
      prefix,
    }),
    externalSchematic('@schematics/angular', 'component', {
      name: `${options.name}-view`,
      style: 'scss',
      prefix,
    }),
    mergeWith(smartTemplateSource, MergeStrategy.Overwrite),
    mergeWith(viewTemplateSource, MergeStrategy.Overwrite),
    updateTsLintPrefixRules(prefix),
  ]);
}
