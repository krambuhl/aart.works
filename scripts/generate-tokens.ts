import fs from 'fs';
import path from 'path';
import setValue from 'set-value';

import designTokens from '../tokens/design-tokens.json' with { type: 'json' };

type ValueObject = { value: string; 'value@dark'?: string };
type TokenPair = [string, ValueObject];

interface TokenInput<T> {
  [key: string]: TokenInput<T> | T;
}

interface TokenOutput {
  [key: string]: ValueObject | string;
}

function extractFlattenedTokens(input: TokenInput<ValueObject>): TokenPair[] {
  const flatPairs: TokenPair[] = [];

  const buildVariables = (
    tokens: TokenInput<ValueObject>,
    prevNamespace = '',
  ) => {
    for (const key in tokens) {
      const value = tokens[key];

      if (typeof value === 'object') {
        if ('value' in value) {
          flatPairs.push([`${prevNamespace}${key}`, value as ValueObject]);
        } else {
          buildVariables(value, `${prevNamespace}${key}.`);
        }
      }
    }
  };

  // kick off the recursive function
  buildVariables(input);

  return flatPairs;
}

function generateTokenName(key: string) {
  return `--${key.replace(/\./g, '-')}`;
}

function addGeneratedHeader(value: string) {
  return (
    '/* DO NOT EDIT */\n' +
    `/* This file was automatically generated at ${new Date().toLocaleString()} */\n\n` +
    value
  );
}

function generateTokensObject(tokenPairs: TokenPair[]) {
  // define the output directory
  const OUTPUT_TOKENS_DIR = path.join(process.cwd(), 'tokens');
  fs.mkdirSync(OUTPUT_TOKENS_DIR, { recursive: true });

  // define the postcss function directory
  const OUTPUT_POSTCSS_FUNCTIONS_DIR = path.join(process.cwd(), 'utilities', 'postcss-functions');
  fs.mkdirSync(OUTPUT_POSTCSS_FUNCTIONS_DIR, { recursive: true });

  // create the token variables object
  const tokenVariables: TokenOutput = {};
  const tokenReference: Record<string, string> = {};

  // loop through the token pairs and build the token variables object
  tokenPairs.forEach(([key]) => {
    setValue(tokenVariables, key, `var(${generateTokenName(key)})`);
    tokenReference[key] = `var(${generateTokenName(key)})`;
  });

  // generate variable output
  const variablesJson = JSON.stringify(tokenVariables, null, 2);
  const variablesOutput = `export const tokens = ${variablesJson} as const;`;

  // write variables
  console.log('writing ' + path.join(OUTPUT_TOKENS_DIR, 'tokens.ts'));
  fs.writeFileSync(
    path.join(OUTPUT_TOKENS_DIR, 'tokens.ts'),
    addGeneratedHeader(variablesOutput),
  );

  // write flat token object
  console.log('writing ' + path.join(OUTPUT_POSTCSS_FUNCTIONS_DIR, 'token-reference.json'));
  fs.writeFileSync(
    path.join(OUTPUT_POSTCSS_FUNCTIONS_DIR, 'token-reference.json'),
    JSON.stringify(tokenReference, null, 2),
  );
}

function generateTokensCss(tokenPairs: TokenPair[]) {
  // define the output directory
  const OUTPUT_STYLES_DIR = path.join(process.cwd(), 'styles');
  fs.mkdirSync(OUTPUT_STYLES_DIR, { recursive: true });

  // create the token variables object
  const tokenValues: Array<[string, string]> = [];
  const tokenDarkValues: Array<[string, string]> = [];

  // loop through the token pairs and build the token variables object
  tokenPairs.forEach(([key, value]) => {
    const tokenName = generateTokenName(key);

    tokenValues.push([tokenName, value.value]);
    if (value['value@dark']) {
      tokenDarkValues.push([tokenName, value['value@dark']]);
    }
  });

  // generate css output
  const cssOutput =
    ':root {\n' +
    tokenValues
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n') +
    '\n}' +
    '@media (prefers-color-scheme: dark) {\n' +
    '  :root {\n' +
    tokenDarkValues
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n') +
    '  \n}' +
    '\n}';

  // write values
  console.log('writing ' + path.join(OUTPUT_STYLES_DIR, 'tokens.css'));
  fs.writeFileSync(
    path.join(OUTPUT_STYLES_DIR, 'tokens.css'),
    addGeneratedHeader(cssOutput),
  );
}

function generateBreakpointsUtilities(tokenPairs: TokenPair[]) {
  // define the output directory
  const OUTPUT_TOKENS_DIR = path.join(process.cwd(), 'tokens');
  fs.mkdirSync(OUTPUT_TOKENS_DIR, { recursive: true });

  // define the output directory
  const OUTPUT_UTILS_DIR = path.join(process.cwd(), 'utilities');
  fs.mkdirSync(OUTPUT_UTILS_DIR, { recursive: true });

  // create the token variables object
  const tokenVariables: TokenOutput = {};

  // loop through the token pairs and build the token variables object
  tokenPairs.forEach(([key, value]) => {
    setValue(tokenVariables, key, value.value);
  });

  // generate breakpointsInPixels object
  const breakpointsInPixels = Object.entries(tokenVariables.breakpoint).reduce<
    Record<string, number>
  >((acc, [key, value]) => {
    acc[key] = parseInt(value);
    return acc;
  }, {});
  const breakpointsInPixelsJson = JSON.stringify(breakpointsInPixels, null, 2);

  const breakpointNames = Object.entries(breakpointsInPixels)
    .sort(([, a], [, b]) => a - b) // sort from smallest to largest
    .map(([name]) => `"${name}"`);

  // generate ts output
  const output = `import { Breakpoint, Responsive } from './opaque-responsive';

/**
 * This is a helper object that contains the pixel values for each breakpoint.
 * @internal This is exposed for testing purposes, and should not be used directly.
 */
export const breakpointsInPixels: Required<Responsive<number>> = ${breakpointsInPixelsJson};

/**
 * This is a helper array that contains the names of each breakpoint in order
 * from smallest to largest.
 */
export const breakpointNames: Breakpoint[] = [${breakpointNames.join(', ')}];
`;

  // write ts output
  console.log('writing ' + path.join(OUTPUT_UTILS_DIR, 'breakpoints.ts'));
  fs.writeFileSync(
    path.join(OUTPUT_UTILS_DIR, 'breakpoints.ts'),
    addGeneratedHeader(output),
  );

  // write json output
  console.log('writing ' + path.join(OUTPUT_TOKENS_DIR, 'breakpoints.json'));
  fs.writeFileSync(
    path.join(OUTPUT_TOKENS_DIR, 'breakpoints.json'),
    breakpointsInPixelsJson,
  );
}

// program:
async function program() {
  // extract the flattened tokens as an array of [path, { value, value@dark }] pairs
  const flatTokens = extractFlattenedTokens(designTokens);

  await generateTokensObject(flatTokens);
  await generateTokensCss(flatTokens);
  await generateBreakpointsUtilities(flatTokens);
}

// run the program
program();
