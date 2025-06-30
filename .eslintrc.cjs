/**
 * @type {ESLint.ConfigData}
 */
module.exports = {
  ignorePatterns: [
    '.server/**',
    '.public/**',
    '.jest/**',
    'coverage/**',
    '**/*.min.js',
    'node_modules/**'
  ],
  overrides: [
    {
      extends: [
        'standard',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:jsdoc/recommended-typescript-flavor',
        'plugin:n/recommended',
        'plugin:promise/recommended',
        '@typescript-eslint/recommended-type-checked',
        '@typescript-eslint/stylistic-type-checked'
      ],
      env: {
        browser: false
      },
      files: ['**/*.{cjs,js}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname
      },
      plugins: [
        '@typescript-eslint',
        'import',
        'jsdoc',
        'n',
        'promise'
      ],
      rules: {
        'no-console': 'error',

        // Turn off strict type checking rules
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',

        // JSDoc blocks are optional by default
        'jsdoc/require-jsdoc': 'off',

        // JSDoc @param types are mandatory for JavaScript
        'jsdoc/require-param-description': 'off',
        'jsdoc/require-param-type': 'error',
        'jsdoc/require-param': 'off',

        // JSDoc @property description is optional
        'jsdoc/require-property-description': 'off',

        // JSDoc @returns is optional
        'jsdoc/require-returns-description': 'off',
        'jsdoc/require-returns-type': 'off',
        'jsdoc/require-returns': 'off',

        // Check for mandatory file extensions
        // https://nodejs.org/api/esm.html#mandatory-file-extensions
        'import/extensions': ['error', 'always', { ignorePackages: true }],

        // Skip rules handled by TypeScript compiler
        'import/default': 'off',
        'import/namespace': 'off',
        'n/no-extraneous-require': 'off',
        'n/no-extraneous-import': 'off',
        'n/no-missing-require': 'off',
        'n/no-missing-import': 'off'
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.cjs', '.js']
        },
        'import/resolver': {
          node: true,
          typescript: true
        }
      }
    },
    {
      files: ['**/*.js'],
      parserOptions: {
        sourceType: 'module'
      }
    },
    {
      env: {
        commonjs: true
      },
      files: ['**/*.cjs'],
      parserOptions: {
        sourceType: 'commonjs'
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',

        // Allow require devDependencies
        'n/no-unpublished-require': [
          'error',
          {
            allowModules: []
          }
        ]
      }
    },
    {
      env: {
        browser: true,
        node: false
      },
      files: ['src/client/**/*.js']
    },
    {
      env: {
        node: true
      },
      globals: {
        jest: 'readonly'
      },
      files: ['.jest/**/*.js']
    },
    {
      env: {
        node: true
      },
      globals: {
        describe: 'readonly',
        test: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        vi: 'readonly'
      },
      files: [
        '**/*.test.{cjs,js}',
        '**/__mocks__/**',
        'test/**/*.js',
        'vitest.config.js'
      ],
      rules: {
        // Allow import devDependencies
        'n/no-unpublished-import': [
          'error',
          {
            allowModules: ['vitest']
          }
        ]
      }
    },
    {
      files: ['vitest.config.js', 'test/**/*.js', '**/*.test.{cjs,js}'],
      rules: {
        // Allow Vitest imports specifically
        'import/no-unresolved': ['error', { ignore: ['^vitest', '^vitest/'] }]
      }
    }
  ],
  root: true
}

/**
 * @import { ESLint } from 'eslint'
 */
