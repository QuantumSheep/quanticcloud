// Define the `phonecatApp` module
const quanticCloud = angular.module('quanticCloud', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
quanticCloud.controller('Explorer', $scope => {
    $scope.files = [{
        type: 'dir',
        name: 'Photos',
    }, {
        type: 'dir',
        name: 'Documents',
    }, {
        type: 'file',
        name: 'TODO.txt',
    }];
});