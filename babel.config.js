const presets = [
  ['@babel/preset-env', { targets: { node: true } }],
  '@babel/preset-typescript',
];
const plugins = [
  'babel-plugin-transform-typescript-metadata',
  ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
];

module.exports = { presets, plugins };
