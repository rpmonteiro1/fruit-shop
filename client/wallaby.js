/* Dev comments:
  This wallaby 'thing' is a godsend when writing tests. If you want to give it a try, just install the Wallaby plugin for your IDE/Text editor, and give this a run. You'll be hooked in no time :-)
*/

module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.js*',
      '!src/**/__tests__/*-test.js'
    ],

    tests: [
      'src/**/__tests__/*-test.js'
    ],

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
