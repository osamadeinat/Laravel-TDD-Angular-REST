'use strict';
var bulk = require('bulk-require');

module.exports = angular.module('Factories', []);

bulk(__dirname, ['./**/!(*factories|*.spec).js']);