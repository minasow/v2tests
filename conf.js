// conf.js
exports.config = {
  framework: 'jasmine',
  directConnect: true,
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],
  plugins: [{
  	path : 'node_modules/aurelia-tools/plugins/protractor.js'
  }],
  capabilities: {
  	'browserName' : 'chrome'
  },

}