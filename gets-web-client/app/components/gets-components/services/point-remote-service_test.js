/**
 * @author      Nikita Davydovsky   
 * @version     0.0.1               (current version number of program)
 * @since       2015-01-14          (the version of the package this class was first added to)
 */
'use strict';

/**
 * Unit tests for Point service.
 */
describe('Point service', function () {
    var $httpBackend;

    // load modules
    beforeEach(module('pointService'));

    beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('phones/phones.json').
                respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

        scope = $rootScope.$new();
        ctrl = $controller('PhoneListCtrl', {$scope: scope});
    }));

    // Test service availability
    it('check the existence of Phone factory', inject(function (Phone) {
        expect(Phone).toBeDefined();
    }));
});


