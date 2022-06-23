/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-prettier'],
  overrides: [
    {
      files: [
        '**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}',
      ],
      extends: ['plugin:cypress/recommended'],
    },
    {
      files: ['*.html'],
      processor: 'vue/.vue',
    },
  ],
}
