import { tokens } from 'tokens';
import { generateRules } from 'utilities/css-utils';

export const rules = generateRules(
  {
    'stu-pt': 'padding-top',
    'stu-pr': 'padding-right',
    'stu-pb': 'padding-bottom',
    'stu-pl': 'padding-left',
    'stu-mt': 'margin-top',
    'stu-mr': 'margin-right',
    'stu-mb': 'margin-bottom',
    'stu-ml': 'margin-left',
  },
  tokens.space,
);
