'use strict';
var bulk = require('bulk-require');

module.exports = angular.module('Directives', []);

bulk(__dirname, ['./**/!(*directives|*.spec).js']);