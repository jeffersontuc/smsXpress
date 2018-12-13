app.controller('smsController', function ($mdConstant, smsService) {
    var vm = this;
    var phonePrice = 0.10;
    var caracPrice = 0.05;

    vm.phones = [];
    vm.customKeys = [$mdConstant.KEY_CODE.SPACE];

    vm.message = '';

    vm.totalCost = 0;
    vm.totalCarac = 0;
    vm.totalPhones = 0;

    vm.currentStage = 'collectData';

    vm.goTo = function (stage) {
        vm.currentStage = stage;

        if(stage === 'payment'){
            calculateCost();
        }
    };


    vm.sendSms = function () {
        var sms = {};
        sms.message = vm.message;
        sms.phones = vm.phones;

        function success(response){
            vm.protocol = formatProtocol(response.data.protocol);
            vm.goTo('confirmed');
        };

        function error(err){
            console.log(error);
        };

        smsService.sendSms(sms).then(success, error);
    };


    function calculateCost() {
        var messageWithoutBlank = vm.message.trim();
        var messageWords = messageWithoutBlank.split(' ');

        var amountOfCarac = countCarac(messageWords);

        vm.totalPhones = vm.phones.length * phonePrice;
        vm.totalCarac = Math.floor(amountOfCarac / 10) * caracPrice;
        vm.totalCost = vm.totalCarac + vm.totalPhones;
    }

    function countCarac(words) {
        var total = 0;
        for(var i = 0; i < words.length; i++){
            total += words[i].length;
        }

        return total;
    };


    function formatProtocol(protocol) {
        var newProtocol = protocol.substring(0, 4) + '-' + protocol.substring(4, 8) + '-' + protocol.substring(8, 12);

        return newProtocol;
    };

});