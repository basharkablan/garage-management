// Define the `phonecatApp` module
const maintenanceApp = angular.module('maintenance-ang', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
maintenanceApp.controller('CarRecordsController', function CarRecordsController($scope, $http) {
    $http.post("get-maintenance-list").then(function(response) {
        $scope.carRecords = response.data.result;
    });
});