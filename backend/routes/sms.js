(function () {

    var express = require('express');
    var router =  express.Router();

    var smsService = require('../services/sms.service.js')();


    router.get('/', smsService.get);

    router.post('/', smsService.create);

    module.exports = router;

}());