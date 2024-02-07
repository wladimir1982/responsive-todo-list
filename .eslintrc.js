module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'react', 'simple-import-sort'],
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          [
            '^react$',
            '^react-*',
            'prop-types$',
            '^redux*',
            '^@reduxjs*',
            '^store',
            '^formik*',
            '^lodash',
            'js-cookies',
            '^[a-z]'
          ],
          [
            '^(services)(/.*|$)',
            '^(components)(/.*|$)',
            '^(pages)(/.*|$)',
            '^(containers)(/.*|$)',
            '^(hooks)(/.*|$)',
            '^(constants)(/.*|$)',
            '^(interfaces)(/.*|$)',
            'notistack',
            '^(utils)(/.*|$)',
            '^@'
          ],
          ['^.+\\.s?css$', '^(theme)(/.*|$)'],
          ['^(assets)(/.*|$)'],
          ['^(mocks)(/.*|$)']
        ]
      }
    ],
    'prettier/prettier': 'error',
    'react/prop-types': 1,
    'no-underscore-dangle': ['off'],
    'no-prototype-builtins': 'off',
    'no-console': ['off'],
    'no-param-reassign': ['off'],
    'class-methods-use-this': ['off'],
    'no-unused-vars': 'warn',
    'no-tabs': 0,
    quotes: [
      2,
      'single',
      {
        avoidEscape: false
      }
    ],
    'arrow-parens': [0],
    'react/react-in-jsx-scope': 0,
    'max-len': [
      1,
      {
        code: 100,
        tabWidth: 2,
        ignoreComments: true,
        ignoreTemplateLiterals: true,
        ignoreStrings: true
      }
    ]
  }
};
