module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    globals: {
        process: 'readonly',
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        indent: ['error', 4, { ignoredNodes: ['TemplateLiteral'] }], // https://github.com/babel/babel-eslint/issues/681#issuecomment-451336031
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'prefer-destructuring': [
            'error',
            {
                array: true,
                object: true,
            },
            {
                enforceForRenamedProperties: false,
            },
        ],
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'error',
        'no-empty': ['error', { allowEmptyCatch: false }],
        'require-await': 'error',
        'no-return-await': 'error',
    },
    overrides: [
        {
            files: ['src/*.*'],
            excludedFiles: ['functions/**/*.ts'],
        },
    ],
}
