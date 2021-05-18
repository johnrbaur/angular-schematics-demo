import { SchematicsException, Tree, Rule } from '@angular-devkit/schematics';

interface Rules {
  'component-selector': [boolean, string, string | string[], string];
}

interface TsLintConfig {
  rules: Rules;
}

function getTslintConfig(tree: Tree): TsLintConfig {
  if (!tree.exists('tslint.json')) {
    throw new SchematicsException('Could not find Tslint configuration');
  }

  try {
    return JSON.parse(tree.read('tslint.json')!.toString()) as TsLintConfig;
  } catch (e) {
    throw new SchematicsException('Error parsing tslint.json');
  }
}

export function updateTsLintPrefixRules(prefix: string): Rule {
  return (tree: Tree) => {
    const config = getTslintConfig(tree);
    const componentSelectorRules = config.rules['component-selector'];
    const ruleEnabled = componentSelectorRules[0];
    if (ruleEnabled) {
      const prefixRule = componentSelectorRules[2];
      const prefixRuleArray = Array.isArray(prefixRule) ? prefixRule : [ prefixRule ];
      if (!prefixRuleArray.includes(prefix)) {
        prefixRuleArray.push(prefix);
        config.rules['component-selector'][2] = prefixRuleArray;
        tree.overwrite('tslint.json', JSON.stringify(config, null, 2));
      }
    }
    return tree;
  };
}
