/**
 * @author      Nikita Davydovsky   
 * @version     0.0.1               (current version number of program)
 * @since       2015-01-14          (the version of the package this class was first added to)
 */

/**
 * The service provides shared data about the app. 
 */
(function() {
    'use strict';

    angular.module('geTSWebClient.configService', [])
    .constant('config', {
        appName: 'GeTS Web Client',
        appVersion: 0.1,
        serverURLDeploy: 'http://gets.cs.petrsu.ru/gets/service/',
        serverURLTest: 'http://localhost/gets/service/'
    });
})();
