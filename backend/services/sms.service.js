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
                .then(message => req.body.sid = message.sid)
                .done(function () {
                    var newSms = new smsModel(req.body);

                    newSms.save(function (err, sms) {
                        if(err){
                            res.json(err);
                        }

                        res.json(sms);
                    })
                });
        };


        Sms.get = function (req, res) {
            smsModel.findOne({protocol: req.params.protocol}, function (err, sms) {
                if(err){
                    res.json(err);
                }else{
                    if(sms === null){
                        res.sendStatus(404);
                    }else{
                        res.json(sms);
                    }
                }
            })
        };



        return Sms;
    };


    module.exports = smsService;
}());