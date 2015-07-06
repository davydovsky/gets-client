/**
 * @author      Nikita Davydovsky   
 * @version     0.0.1               (current version number of program)
 * @since       2015-01-22          (the version of the package this class was first added to)
 */

/**
 * Points Service
 * @namespace PointsServices
 */
(function() {
    'use strict';

    /**
     * @namespace Points Service
     * @desc The service contains points and performs operations upone them, with optional 
     * sync with the GeTS Server.
     * @memberOf PointsServices
     */
    angular.module('geTSWebClient.pointsService', ['geTSWebClient.pointRemoteService', 'geTSWebClient.pointListRemoteService'])

    .factory('PointsService', PointsService);

    PointsService.$inject = ['PointRemoteService', 'PointListRemoteService'];
    
    function PointsService(PointRemoteService, PointListRemoteService) {        
        return service;
        
        var service = (function () {
            // A list of Point objects
            var points = [];
            
            // A private function which logs any arguments
            myPrivateMethod = function (foo) {
                console.log(foo);
            };

            return {
                /**
                 * Public interface
                 */
                downloadPoints: downloadPoints
            };
            
            
            
            /**
            * @name downloadPoints
            * @desc Wrapper function for the "loadPoints"         
            * @param {Query Object} query
            * @returns {$httpPromise}
            * @memberOf PointsServices.PointsService
            */
            function downloadPoints(query) {
                
            }

            function createPoint(data) {
                return {
                    geojson : {
                        type: "Feature",
                        properties: {
                            name: data.name,
                            description: data.description,
                            uuid: "ce97b995-ebc6-43ed-87f3-fa0ffc0c1d32",
                            access: "rw"
                        },
                        geometry: {
                            type: "Point",
                            coordinates: [                   
                                34.361114,
                                61.777669
                            ]
                        }
                    },
                    addRemote: function () {
                        PointRemoteService.addPoint(this);
                    },
                    updateRemote: function () {
                        PointRemoteService.updatePoint(this);
                    },
                    deleteRemote: function () {
                        PointRemoteService.deletePoint(this);
                    }
                };
            }
        })();        
    }
    
})();

