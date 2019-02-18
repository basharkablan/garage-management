// Define the `maintenanceApp` module
const maintenanceApp = angular.module('maintenance-ang', []);

// Define the `CarRecordsController` controller on the `maintenanceApp` module
maintenanceApp.controller('CarRecordsController', function CarRecordsController($scope, $http) {
    $http.post("get-maintenance-list").then(function(response) {
        $scope.carRecords = response.data.result;
    });
});