module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: 'eslint:recommended',
    rules: {
        'no-console': 'off'
    },
    "parserOptions": {
        "ecmaVersion": 8,
    }
};