const presets = [
  ['@babel/preset-env', { targets: { node: true } }],
  '@babel/preset-typescript',
];
const plugins = [
  [
    'module-resolver',
    {
      alias: {
        '@modules': './src/modules',
        '@config': './src/config',
        '@shared': './src/shared',
        '@errors': './src/errors',
        '@utils': './src/utils',
      },
    },
  ],
  'babel-plugin-transform-typescript-metadata',
  ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
];

module.exports = { presets, plugins };
