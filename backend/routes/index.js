(function () {

    var express = require('express');
    var router =  express.Router();

    var sms = require('./sms.js');

    router.get('/', function (req, res) {
        res.send('Welcome to smsXpress!');
    });


    router.use('/sms', sms);

    module.exports = router;

}());