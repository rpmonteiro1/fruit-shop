module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.js*',
      '!src/**/__tests__/*-test.js',
      '!src/images/*'
    ],

    tests: ['src/**/__tests__/*-test.js'],

    compilers: {
      '**/*.js*': wallaby.compilers.babel()
    },

    env: {
      type: 'node'
    },

    testFramework: 'mocha',

    setup: function () {
      require.extensions['.jsx'] = require.extensions['.js']
      require('./src/app/utils/test-helpers')
    }
  }
}
