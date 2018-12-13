app.service('smsService', function ($http) {
    var service = this;


    service.sendSms = sendSms;
    service.getSms = getSms;

    function sendSms(sms) {
        return $http.post('/api/sms', sms);
    }

    function getSms(protocol) {
        return $http.get('/api/sms/' + protocol);
    };

    return service;

});