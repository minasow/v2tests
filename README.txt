Program: Protractor Testing Suite for SIRUM v2 Website
Date of Last Work: November 15, 2016
-------------------------
Goal: Provide an automatic way of running thorough E2E tests of the v2 site. Using checklist from dscsa/client README.txt, as well as other thoughts.

Components:
README.txt
node_modules directory: contains necessary modules, may require 'npm install' in general or for specific modules used in the code
conf.js: Configuration file for the program. Included in next line. Should not need edits.

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

	//Sets up the framework, and specifies which browser type to use. Also references the spec file by path in the 'specs' property

spec.js: The actual program code. Contains all tests right now, as there is no abstraction. 

Status:
As of last work, program can run tests by logging in, creating new shipment, switching shipment, adding an ordered drug, adding it again by double-click of enter, delete with qty=0. Can check snackbar for response message. More testing on shipments page needs to be included. As well as testing on all the other pages. Dependent on time-outs to keep test valid, must be fixed since very fragile.

Requires:
That you be running v2 at localhost:9000 already, when it starts. Could be improved so we have one gulp call that launches server and then runs test. 

To execute:
- Launch site on localhost:9000
- In new Terminal window navigate to v2testing
- Enter > protractor conf.js 
