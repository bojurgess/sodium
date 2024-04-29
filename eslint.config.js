import js from '@eslint/js';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        files: ['src/**/*.ts'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
            },
            parserOptions: {
                ecmaVersion: 'latest',
            },
        },
        rules: {
            'no-empty-function': 'error',
            'no-var': 'error',
            'no-floating-decimal': 'error',
            'no-console': 'off',
            'no-lonely-if': 'error',
            'no-multi-spaces': 'error',
            yoda: 'error',
            'prefer-const': 'error',
            'max-nested-callbacks': ['error', { max: 4 }],
            'max-statements-per-line': ['error', { max: 2 }],
            'handle-callback-err': 'off',
            'no-multiple-empty-lines': [
                'error',
                { max: 2, maxEOF: 1, maxBOF: 0 },
            ],
        },
    },
];
