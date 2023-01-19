import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
    downloadsFolder: 'test-results/downloads',
    fixturesFolder: 'test-results/fixtures',
    screenshotsFolder: 'test-results/screenshots',
    videosFolder: 'test-results/videos',
  },
});
