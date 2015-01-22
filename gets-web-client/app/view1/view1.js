'use strict';

angular.module('geTSWebClient.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$log', 'PointRemoteService', function($log, PointRemoteService) {
                PointRemoteService.addPoint({
                geojson: {
                type: "Feature",
                        properties: {
                        name: 'New point'
                        },
                        geometry: {
                        type: "Point",
                                coordinates: [
                                        54.11,
                                        45.11
                                ]
                        }
                }

                }).then(function (data, status, headers, config) {
                    $log.debug(data);
                }).catch(function (e) {
                    $log.debug('got an error in initial processing', e);
                    //throw e;
                });               
}]);