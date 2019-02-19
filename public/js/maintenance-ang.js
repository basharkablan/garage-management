// Define the `maintenanceApp` module
const maintenanceApp = angular.module('maintenance-ang', ['ui.bootstrap']);

// Define the `CarRecordsController` controller on the `maintenanceApp` module
maintenanceApp.controller('CarRecordsController', function CarRecordsController($scope, $http, $uibModal) {
    $http.post("get-maintenance-list").then(function(response) {
        $scope.carRecords = response.data.result;
    });

    $scope.open = function(id) {
        var modalInstance =  $uibModal.open({
            templateUrl: 'static/html/edit_modal.html',
            controller: "ModalContentCtrl",
            controllerAs: 'ctrl',
            resolve: {
                data: function() { return id; }
              }
        });
        
        modalInstance.result.then(function(response){
            console.log(response);
            if("")
            $scope.result = `${response} button hitted`;
        });
        
    };
});

angular.module('maintenance-ang').controller('ModalContentCtrl', function($scope, $http, $uibModalInstance, data) {
    var ctrl = this;
    ctrl.carID = data;
    ctrl.error = "";

    $http.post("/get-car-record", {carID: ctrl.carID}).then(function(response) {
        if(response.data.status == "success") {
            ctrl.carRecord = response.data.result;
        }
        else
            ctrl.error = response.data.message;
    })

    ctrl.ok = function() {

        console.log(ctrl.carRecord);

        $http.post("/update", {carRecord: ctrl.carRecord}).then(function(response) {
            if(response.data.status == "success") {
                $uibModalInstance.close("Ok");
            }
            else
                ctrl.error = response.data.message;
        });
    }
     
    ctrl.cancel = function() {
        $uibModalInstance.close("cancel");
        $uibModalInstance.dismiss();
    }
});