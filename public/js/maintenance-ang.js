// Define the `maintenanceApp` module
const maintenanceApp = angular.module('maintenance-ang', ['ui.bootstrap']);

// Define the `CarRecordsController` controller on the `maintenanceApp` module
maintenanceApp.controller('CarRecordsController', function CarRecordsController($scope, $http, $uibModal) {
    $http.post("get-maintenance-list").then(function(response) {
        $scope.carRecords = response.data.result;
    });

    $http.post("get-brands-list").then(function(response) {
        $scope.brands = response.data.result;
    });

    $http.post("get-codes-list").then(function(response) {
        $scope.errorCodes = response.data.result;
    });

    $scope.open = function(car) {
        var modalInstance =  $uibModal.open({
            templateUrl: 'static/html/edit_modal.html',
            controller: "ModalContentCtrl",
            controllerAs: 'ctrl',
            resolve: {
                data: function() { return car._id; },
                brands: function() { return $scope.brands },
                errorCodes: function() { return $scope.errorCodes }
              }
        });
        
        modalInstance.result.then(function(response) {
            console.log(response);
            if(response.status == "ok") {
                var index = $scope.carRecords.indexOf(car);
                if(index != -1)
                    $scope.carRecords[index] = response.carRecord;
            }
        }, function () {

        });
    };
});

angular.module('maintenance-ang')
    .controller('ModalContentCtrl', function($scope, $http, $uibModalInstance, $window, data, brands, errorCodes) {
        var ctrl = this;
        ctrl.carID = data;
        ctrl.error = "";
        ctrl.brands = brands;
        ctrl.errorCodes = errorCodes;

        ctrl.codeInput = null;

        $window.errorCodes = errorCodes;
        $window.codeInput = ctrl.codeInput;
        
        $http.post("/get-car-record", {carID: ctrl.carID}).then(function(response) {
            if(response.data.status == "success") {
                ctrl.carRecord = response.data.result;
                ctrl.carRecord.date = new Date(ctrl.carRecord.date);
            }
            else
                ctrl.error = response.data.message;
        })
        
        ctrl.ok = function() {
            $http.post("/update", {carRecord: ctrl.carRecord}).then(function(response) {
                if(response.data.status == "success") {
                    //$uibModalInstance.close("Ok");
                    $uibModalInstance.close({status: "ok", carRecord: ctrl.carRecord});
                }
                else
                    ctrl.error = response.data.message;
            });
        }

        ctrl.cancel = function() {
            $uibModalInstance.close({status: "cancel"});
            $uibModalInstance.dismiss();
        }

        ctrl.addError = function() {
            ctrl.codeInput = $window.codeInput;

            if(errorCodes.indexOf(ctrl.codeInput) !== -1)
                if(ctrl.carRecord.errorCodes.indexOf(ctrl.codeInput) == -1) {
                    ctrl.carRecord.errorCodes.push(ctrl.codeInput);
            }
        }
});