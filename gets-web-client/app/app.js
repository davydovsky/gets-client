'use strict';

// Declare app level module which depends on views, and components
angular.module('geTSWebClient', [
  'ngRoute',
  'geTSWebClient.view1',
  'geTSWebClient.view2',
  'geTSWebClient.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
