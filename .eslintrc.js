module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        js: 'never',
      },
    ],
    'import/no-extraneous-dependencies': 'off', // можна також через overrides
    'no-return-await': 'warn',
  },
  overrides: [
    {
      files: ['**/*.spec.ts', '**/tests/**/*.ts', '**/fixtures/**/*.ts', '**/pages/**/*.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};