'use strict';

angular.module('geTSWebClient.version', [
    'geTSWebClient.version.interpolate-filter',
    'geTSWebClient.version.version-directive'
])

.value('version', '0.0.1');
