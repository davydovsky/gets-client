/**
 * @author      Nikita Davydovsky   
 * @version     0.0.1               (current version number of program)
 * @since       2015-01-14          (the version of the package this class was first added to)
 */
'use strict';

/**
 * Unit tests for Point service.
 */
describe('Point Remote Service', function () {
    var pointRemoteService,
        mock_http,
        mock_x2js,
        mock_config;
        
    var pointExample = {
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

    };    

    // load modules
    beforeEach(module('pointRemoteService'));
    
    // Add mock dependencies for angular-xml and config services
    beforeEach(function () {      
        function mockX2JS() {
            this.json2xml_str = function () {
                return '<request>\n\
                            <params>\n\
                                <auth_token></auth_token>\n\
                                <title></title>\n\
                                <category_id></category_id>\n\
                                <latitude></latitude>\n\
                                <longitude></longitude>\n\
                            </params>\n\
                        </request>';
            };
        }
        
        mock_x2js = function () {
            this.$get = ['X2JS', function () {
                    return new mockX2JS();
            }];
        };
                     
        mock_config = {
            appName: 'GeTS Web Client',
            appVersion: 0.1,
            serverURLDeploy: 'http://gets.cs.petrsu.ru/gets/service/',
            serverURLTest: 'http://localhost/gets/service/'
        };

        module(function ($provide) {
            $provide.provider('x2js', mock_x2js);
            $provide.constant('config', mock_config);
        });
    });

    beforeEach(inject(function (PointRemoteService, $httpBackend) {
        pointRemoteService = PointRemoteService;
        mock_http = $httpBackend;
    }));
    
    
    it('should check the existence of PointRemoteService factory', function () {
        expect(pointRemoteService).toBeDefined();
    });
    
    describe('addPoint', function () {
        it('should check that addPoint returns $http promise', function () {
            mock_http
                    .expectPOST('http://localhost/gets/service/addPoint.php')
                    .respond({
                        status: {
                            code: 0,
                            message: "success"
                        }
                    });

            var promise = pointRemoteService.addPoint({
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
            });
                            
            mock_http.flush();
            expect(
                    angular.isObject(promise) &&
                    promise.then instanceof Function && 
                    promise["catch"] instanceof Function && 
                    promise["finally"] instanceof Function && 
                    promise.error instanceof Function && 
                    promise.success instanceof Function
            )
            .toBeTruthy();    
        });
        
        it('should check that HTTP POST request in addPoint returns object', function () {
            mock_http
                    .expectPOST('http://localhost/gets/service/addPoint.php')
                    .respond({
                        status: {
                            code: 0,
                            message: "success"
                        }
                    });

            var promise = pointRemoteService.addPoint(pointExample);
            
            var response;
                
            promise.success(function (data) {
                response = data;
            });
            
            mock_http.flush();
            expect(angular.isObject(response)).toBeTruthy();    
        });
    });
    
});


