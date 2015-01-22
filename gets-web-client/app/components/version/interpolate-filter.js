(function () {
    'use strict';

    angular.module('geTSWebClient.version.interpolate-filter', [])

    .filter('interpolate', ['version', interpolate]);

    function interpolate(version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }
})();
