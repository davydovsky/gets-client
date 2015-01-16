/**
 * @author      Nikita Davydovsky   
 * @version     0.0.1               (current version number of program)
 * @since       2015-01-14          (the version of the package this class was first added to)
 */

'use strict';

/**
 * The service handles manipulations with the GeTS Server, such as: 
 * - add point;
 * - update point;
 * - delete point.
 */
var pointService = angular.module('pointRemoteService', ['xml', 'configService']);

/**
 * Use angular-xml to tranform all xml responses to js objects.
 */
pointService.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('xmlHttpInterceptor');
}]);

pointService.factory('PointRemoteService', ['$http', 'x2js', 'config', 
    function ($http, x2js, config) {
        
        /**
         * Public interface
         */        
        return {
            addPoint: addPoint,
            updatePoint: updatePoint,
            deletePoint: deletePoint
        };
                
        /**
         * Add given point to the GeTS Server.
         * @param {GeoJson Object} point
         * @returns {Promise}
         */        
        function addPoint(point) {
            var ADD_POINT_URL = config.serverURLTest + 'addPoint.php';
            var xmlDoc = x2js.json2xml_str({
                request: {
                    params: {
                        auth_token: '',
                        category_id: '',
                        title: point.geojson.properties.name,
                        latitude: point.geojson.geometry.coordinates[1],
                        longitude: point.geojson.geometry.coordinates[0]
                    }
                }
            });
            return $http.post(ADD_POINT_URL, xmlDoc);
        }
        
        /**
         * Update given point on the GeTS Server.
         * @param {GeoJson Object} point
         * @returns {Promise}
         */        
        function updatePoint(point) {
            var UPDATE_POINT_URL = config.serverURLTest + 'updatePoint.php';            
        }
        
        /**
         * Delete given point from the GeTS Server.
         * @param {GeoJson Object} point
         * @returns {Promise}
         */        
        function deletePoint(point) {
            var DELETE_POINT_URL = config.serverURLTest + ' deletePoint.php';
        }
}]);


