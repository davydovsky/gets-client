/**
 * @author      Nikita Davydovsky   
 * @version     0.0.1               (current version number of program)
 * @since       2015-01-14          (the version of the package this class was first added to)
 */

(function() {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('geTSWebClient', [
      'ngRoute',
      'geTSWebClient.view1',
      'geTSWebClient.version',

      'geTSWebClient.pointRemoteService',
    ])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});
    }]);
})();