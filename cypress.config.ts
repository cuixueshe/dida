import { defineConfig } from 'cypress'

const baseUrl
  = process.env.NODE_ENV === 'developer'
    ? 'http://127.0.0.1:5174/#/'
    : 'http://127.0.0.1:4173/#/'

export default defineConfig({
  e2e: {
    baseUrl,
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
