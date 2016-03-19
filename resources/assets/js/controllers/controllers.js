'use strict';
var bulk = require('bulk-require');

module.exports = angular.module('Controllers', ['ngMessages']);

bulk(__dirname, ['./**/!(*controllers|*.spec).js']);