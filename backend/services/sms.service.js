(function () {
    var twilio = require('twilio');
    var twilioConfig = require('../config/twilio/config.js');

    var accountSid = twilioConfig.accountSid;
    var authToken = twilioConfig.authToken;
    var client = new twilio(accountSid, authToken);

    var smsModel = require('../db/models/sms.js');


    var smsService = function () {
        var Sms = {};


        Sms.create = function (req, res) {

            client.messages
                .create({from: twilioConfig.fromNumber, body: req.body.message, to: req.body.phones})
                .then(function (message) {
                    var sms = req.body;
                    sms.sid = message.sid;

                    var newSms = new smsModel(sms);

                    newSms.save(function (err, sms) {
                        if(err){
                            res.json(err);
                        }

                        res.json(sms);
                    })
                })
                .done();
        };


        Sms.get = function (req, res) {
            smsModel.find(req.query, function (err, sms) {
                if(err){
                    res.json(err);
                }

                res.json(sms);
            })
        };



        return Sms;
    };

    function sendSms(message, phones){

    };


    module.exports = smsService;
}());