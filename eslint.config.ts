import pluginVitest from '@vitest/eslint-plugin'
import { globalIgnores } from 'eslint/config'
import { defineConfig } from 'eslint/config'
import skipFormatting from 'eslint-config-prettier/flat'
import pluginOxlint from 'eslint-plugin-oxlint'
import * as regexpPlugin from 'eslint-plugin-regexp'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

const mode = process.env.NODE_ENV === 'production' ? 'error' : 'warn'

export default defineConfig(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/docs/**']),

  tseslint.configs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  skipFormatting,

  regexpPlugin.configs['flat/recommended'],

  {
    plugins: { 'simple-import-sort': simpleImportSort },

    rules: {
      'simple-import-sort/imports': mode,
      'simple-import-sort/exports': mode,
      'no-console': mode,
      'no-debugger': mode,
    },
  },
)
