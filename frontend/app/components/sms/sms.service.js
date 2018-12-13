app.service('smsService', function ($http) {
    var service = this;


    service.sendSms = sendSms;
    service.getSms = getSms;

    function sendSms(sms) {
        return $http.post('/sms', sms);
    }

    function getSms(protocol) {
        return $http.get('/sms/' + protocol);
    };

    return service;

});