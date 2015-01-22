/**
 * @author      Nikita Davydovsky   
 * @version     0.0.1               (current version number of program)
 * @since       2015-01-14          (the version of the package this class was first added to)
 */

/**
 * Point Remote Service
 * @namespace PointsServices
 */
(function() {
    'use strict';

    /**
     * @namespace PointRemoteService
     * @desc The service handles manipulations with the GeTS Server, such as:<br>
     * <ul>  
     *    <li>add point</li>
     *    <li>update point</li>
     *    <li>delete point</li>
     * </ul>
     * @memberOf PointsServices
     */
    angular.module('geTSWebClient.pointRemoteService', ['xml', 'geTSWebClient.configService'])

    /**
     * Use angular-xml to tranform all xml responses to js objects
     */
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('xmlHttpInterceptor');
    }])

    .factory('PointRemoteService', PointRemoteService);

    PointRemoteService.$inject = ['$http', 'x2js', 'config'];    

    function PointRemoteService($http, x2js, config) {

        /**
         * Public interface
         */
        return {
            addPoint: addPoint,
            updatePoint: updatePoint,
            deletePoint: deletePoint
        };

        /**
         * @name addPoint
         * @desc Add given point to the GeTS Server         
         * @param {GeoJson Object} point
         * @returns {$httpPromise}
         * @memberOf PointsServices.PointRemoteService
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
         * @name updatePoint
         * @desc Update given point on the GeTS Server   
         * @param {GeoJson Object} point
         * @returns {$httpPromise}
         * @memberOf PointsServices.PointRemoteService
         */
        function updatePoint(point) {
            var UPDATE_POINT_URL = config.serverURLTest + 'updatePoint.php';
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
            return $http.post(UPDATE_POINT_URL, xmlDoc);
        }

        /**
         * @name deletePoint
         * @desc Delete given point from the GeTS Server   
         * @param {GeoJson Object} point
         * @returns {$httpPromise}
         * @memberOf PointsServices.PointRemoteService
         */
        function deletePoint(point) {
            var DELETE_POINT_URL = config.serverURLTest + 'deletePoint.php';
            
            var params = {};
            params.auth_token = '';
            params[point.geojson.properties.parent.type] = point.geojson.properties.parent.name;
            params.uuid = point.geojson.properties.uuid;
                    
            var xmlDoc = x2js.json2xml_str({
                request: {
                    params: params
                }
            });           
            return $http.post(DELETE_POINT_URL, xmlDoc);
        }
    }
})();


