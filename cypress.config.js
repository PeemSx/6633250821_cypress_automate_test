const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://zero.webappsecurity.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    video: true,
  },
  projectId: 'acx4qj',
})