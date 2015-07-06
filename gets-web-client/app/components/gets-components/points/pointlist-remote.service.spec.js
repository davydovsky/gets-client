/**
 * @author      Nikita Davydovsky   
 * @version     0.0.1               (current version number of program)
 * @since       2015-01-22          (the version of the package this class was first added to)
 */

/**
 * Unit tests for Point service.
 */
describe('Point List Remote Service', function () {
    'use strict';
    
    var pointListRemoteService,
        mock_http,
        mock_x2js,
        mock_config;
        
    var query_example = {       
        latitude: 54.11,
        longitude: 45.11,
        radius: 10
    };    

    // load modules
    beforeEach(module('geTSWebClient.pointListRemoteService'));
    
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

    beforeEach(inject(function (PointListRemoteService, $httpBackend) {
        pointListRemoteService = PointListRemoteService;
        mock_http = $httpBackend;
    }));
    
    
    it('should check the existence of PointListRemoteService factory', function () {
        expect(pointListRemoteService).toBeDefined();
    });
    
    describe('loadPoints', function () {
        it('should check that loadPoints returns $http promise', function () {
            mock_http
                    .expectPOST('http://localhost/gets/service/loadPoints.php')
                    .respond({
                        status: {
                            code: 0,
                            message: "success"
                        }
                    });

            var promise = pointListRemoteService.loadPoints(query_example);
                            
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
        
        it('should check that loadPoints throws Error when \'query\' argument is undefined', function () {                                       
            expect(function(){ 
                pointListRemoteService.loadPoints(); 
            }).toThrow(new Error('ddd'));              
        });
    });
});


