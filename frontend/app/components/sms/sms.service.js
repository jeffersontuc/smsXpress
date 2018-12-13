app.service('smsService', function ($http) {
    var service = this;


    service.sendSms = sendSms;



    function sendSms(sms) {
        return $http.post('/sms', sms);
    }

    return service;

});