module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  ignorePatterns: [
    'dist/*',
    'node_modules/*',
  ],
  overrides: [
    {
      files: '*.ts',
      extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      plugins: [
        '@typescript-eslint',
      ],
      rules: {
        'no-console': 'off', // cli
        'import/extensions': 'off', // module type
      },
    },
  ],
  rules: {
    'no-console': 'off', // cli
    'import/extensions': 'off', // module type
  },
};
