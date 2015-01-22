(function () {
    'use strict';

    angular.module('geTSWebClient.version.version-directive', [])

    .directive('appVersion', ['version', appVersion]);

    function appVersion(version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }
})();
