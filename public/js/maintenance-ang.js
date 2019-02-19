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

    $scope.openEdit = function(car) {
        var modalInstance =  $uibModal.open({
            templateUrl: 'static/html/edit_modal.html',
            controller: "ModalEditCtrl",
            controllerAs: 'ctrl',
            resolve: {
                data: function() { return car._id; },
                brands: function() { return $scope.brands },
                errorCodes: function() { return $scope.errorCodes }
            }
        });
        
        modalInstance.result.then(function(response) {
            if(response.status == "ok") {
                // maybe: request the list from server instead
                var index = $scope.carRecords.indexOf(car);
                if(index != -1)
                    $scope.carRecords[index] = response.carRecord;
            }
        }, function () {

        });
    };

    $scope.openAdd = function() {
        var modalInstance =  $uibModal.open({
            templateUrl: 'static/html/edit_modal.html',
            controller: "ModalAddCtrl",
            controllerAs: 'ctrl',
            resolve: {
                brands: function() { return $scope.brands },
                errorCodes: function() { return $scope.errorCodes }
            }
        });
        
        modalInstance.result.then(function(response) {
            if(response.status == "ok") {
                $http.post("get-maintenance-list").then(function(response) {
                    $scope.carRecords = response.data.result;
                });
            }
        }, function () {

        });
    };

    $scope.openDelete = function(car) {
        var modalInstance =  $uibModal.open({
            templateUrl: 'static/html/delete_modal.html',
            controller: "ModalDeleteCtrl",
            controllerAs: 'ctrl',
            resolve: {
                data: function() { return car; }
            }
        });
        
        modalInstance.result.then(function(response) {
            if(response.status == "ok") {
                $http.post("get-maintenance-list").then(function(response) {
                    $scope.carRecords = response.data.result;
                });
            }
        }, function () {

        });
    };
});

angular.module('maintenance-ang')
    .controller('ModalEditCtrl', function($scope, $http, $uibModalInstance, $window, data, brands, errorCodes) {
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
        
        ctrl.deleteError = function(errorCode) {
            var index = ctrl.carRecord.errorCodes.indexOf(errorCode);
            ctrl.carRecord.errorCodes.splice(index, 1); 
        }

        ctrl.addCode = function() {
            ctrl.codeInput = $window.codeInput;

            if(errorCodes.indexOf(ctrl.codeInput) !== -1)
                if(ctrl.carRecord.errorCodes.indexOf(ctrl.codeInput) == -1) {
                    ctrl.carRecord.errorCodes.push(ctrl.codeInput);
            }
        }
});

angular.module('maintenance-ang')
    .controller('ModalAddCtrl', function($scope, $http, $uibModalInstance, $window, brands, errorCodes) {
        var ctrl = this;
        ctrl.error = "";
        ctrl.brands = brands;
        ctrl.errorCodes = errorCodes;

        ctrl.codeInput = null;

        $window.errorCodes = errorCodes;
        $window.codeInput = ctrl.codeInput;

        ctrl.carRecord = {carNumber: "", date: new Date(), brandName: brands[0], model: "",
        year: 1950, engine: "", errorCodes: [], complaint: "", workDone: "", cost: 0};
        
        ctrl.ok = function() {
            $http.post("/add", {carRecord: ctrl.carRecord}).then(function(response) {
                if(response.data.status == "success") {
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

        ctrl.deleteError = function(errorCode) {
            console.log("errorCode");
            var index = ctrl.carRecord.errorCodes.indexOf(errorCode);
            ctrl.carRecord.errorCodes.splice(index, 1); 
        }

        ctrl.addCode = function() {
            ctrl.codeInput = $window.codeInput;

            if(errorCodes.indexOf(ctrl.codeInput) !== -1)
                if(ctrl.carRecord.errorCodes.indexOf(ctrl.codeInput) == -1) {
                    ctrl.carRecord.errorCodes.push(ctrl.codeInput);
            }
        }
});

angular.module('maintenance-ang')
    .controller('ModalDeleteCtrl', function($scope, $http, $uibModalInstance, data) {
        var ctrl = this;
        ctrl.carRecord = data;
        ctrl.error = "";
        
        ctrl.ok = function() {
            $http.post("/delete", {carRecord: ctrl.carRecord}).then(function(response) {
                if(response.data.status == "success") {
                    $uibModalInstance.close({status: "ok"});
                }
                else
                    ctrl.error = response.data.message;
            });
        }

        ctrl.cancel = function() {
            $uibModalInstance.close({status: "cancel"});
            $uibModalInstance.dismiss();
        }
});