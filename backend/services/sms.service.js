(function () {
    var twilio = require('twilio');
    var twilioConfig = require('../config/twilio/config.js');
    const generate = require('nanoid/generate');

    var accountSid = twilioConfig.accountSid;
    var authToken = twilioConfig.authToken;
    var client = new twilio(accountSid, authToken);

    var smsModel = require('../db/models/sms.js');


    var smsService = function () {
        var Sms = {};


        Sms.create = function (req, res) {

            client.messages
                .create({from: twilioConfig.fromNumber, body: req.body.message, to: req.body.phones})
                .then()
                .catch(function (error) {
                    res.sendStatus(400);
                })
                .done(function (sid) {
                    if(sid){
                        var newSms = new smsModel(req.body);

                        newSms.save(function (err, sms) {
                            if(err){
                                res.json(err);
                            }

                            createProtocol(res, sms);
                        })
                    }
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

    function generateProtocol() {
        return generate('1234567890abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ', 12);
    }

    function createProtocol(res, sms){

        smsModel.find({}, 'protocol -_id', function (err, smsProtocols) {
            if (err) res.json(err);

            var protocol = generateProtocol();
            while(containsProtocol(smsProtocols, protocol)){
                protocol = generateProtocol();
            }

            smsModel.findOneAndUpdate({_id: sms._id}, {protocol: protocol}, {new: true}, function (err, newSms) {
                if(err) res.json(err);

                res.json(newSms);
            });
        });
    }

    function containsProtocol(sms, value){
        for(var i = 0; i < sms.length; i++){
            if(sms[i].protocol === value){
                return true;
            }
        }
        return false;
    }

    module.exports = smsService;
}());