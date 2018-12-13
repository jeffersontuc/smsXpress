app.controller('homeController', function ($window, $location, $anchorScroll, $mdDialog, $scope, smsService) {
    var vm = this;
    vm.title = 'Home';

    vm.currentSection = '';

    vm.goToSection = function (hash) {
        vm.currentSection = hash;
        $location.hash(hash);
        $anchorScroll();
    };

    vm.showConsultDialog = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: './app/views/consultDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };

    function DialogController($scope, $mdDialog) {
        $scope.notFoundSms = false;
        $scope.gotSmsData = false;

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };

        $scope.getSms = function (protocol) {
            protocol = protocol.split('-');
            protocol = protocol.join('');
            $scope.gettingSms = true;

            function success(response){
                $scope.sms = response.data;
                $scope.gotSmsData = true;
                $scope.notFoundSms = false;
                $scope.gettingSms = false;
            }

            function error(err){
                $scope.gettingSms = false;
                $scope.notFoundSms = true;
                $scope.gotSmsData = false;
                $scope.text = 'Nenhum SMS foi encontrado com esse número de protocolo!';
            }

            smsService.getSms(protocol).then(success, error);
        };
    }
});