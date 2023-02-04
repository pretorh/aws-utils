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
  rules: {
    // old code to fix,
    'no-console': 'off',
    'import/extensions': 'off',
    'no-param-reassign': 'off',
    'import/newline-after-import': 'off',
    'no-use-before-define': 'off',
  },
};
