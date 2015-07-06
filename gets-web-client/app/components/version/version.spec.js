'use strict';

describe('geTSWebClient.version module', function () {
    beforeEach(module('geTSWebClient.version'));

    describe('version service', function () {
        it('should return current version', inject(function (version) {
            expect(version).toEqual('0.0.1');
        }));
    });
});
