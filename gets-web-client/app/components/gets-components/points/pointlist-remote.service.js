/**
 * @author      Nikita Davydovsky   
 * @version     0.0.1               (current version number of program)
 * @since       2015-01-22          (the version of the package this class was first added to)
 */

/**
 * PointList Remote Service
 * @namespace PointsServices
 */
(function() {
    'use strict';

    /**
     * @namespace PointListRemoteService
     * @desc The service handles manipulations with the GeTS Server, such as:<br>
     * <ul>  
     *    <li>loadPoints</li>
     * </ul>
     * @memberOf PointsServices
     */
    angular.module('geTSWebClient.pointListRemoteService', ['xml', 'geTSWebClient.configService'])

    .factory('PointListRemoteService', PointListRemoteService);

    PointListRemoteService.$inject = ['$http', 'x2js', 'config'];    

    function PointListRemoteService($http, x2js, config) {
        
        /**
         * Public interface
         */
        return {
            loadPoints: loadPoints
        };

        /**
         * @name loadPoints
         * @desc Load point list from the GeTS Server         
         * @param {Query Object} query
         * @returns {$httpPromise}
         * @memberOf PointsServices.PointRemoteService
         */
        function loadPoints(query) {
            if (angular.isUndefined(query)) {
                throw new Error('Error: PointListRemoteService, loadPoints, ' + this);
            }
            
            // Check query conditions
            var locationCondition = (
                    (!angular.isUndefined(query.latitude) && query.latitude !== '') &&
                    (!angular.isUndefined(query.longitude) && query.longitude !== '') &&
                    (!angular.isUndefined(query.radius) && query.radius !== '')
            );
    
            var categoryCondition = 
                    !angular.isUndefined(query.categoryId) &&
                    query.categoryId != -1;
           
            if (!locationCondition && !categoryCondition) {
                throw new Error('ddd');
            }
            
            var params = {};
            //params.auth_token = '';

            // Depend on conditions create 'params' object
            if (locationCondition && categoryCondition) {
                params.latitude = query.latitude;
                params.longitude = query.longitude;
                params.radius = query.radius;
                params.category_id = query.categoryId;
            } else if (locationCondition) {
                params.latitude = query.latitude;
                params.longitude = query.longitude;
                params.radius = query.radius;
            } else {
                params.category_id = query.categoryId;
            }
            
            var LOAD_POINTS_URL = config.serverURLTest + 'loadPoints.php';
            var xmlDoc = x2js.json2xml_str({
                request: {
                    params: params
                }
            });           
            return $http.post(LOAD_POINTS_URL, xmlDoc);
        }
    }
})();

