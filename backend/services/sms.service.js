(function () {

    var smsModel = require('../db/models/sms.js');

    var smsService = function () {
        var Sms = {};


        Sms.create = function (req, res) {

            var newSms = new smsModel(req.body);

            newSms.save(req.body, function (err, sms) {
                if(err){
                    res.json(err);
                }

                res.json(sms);
            })
        };


        Sms.get = function (req, res) {
            smsModel.findOne(req.query, function (err, sms) {
                if(err){
                    res.json(err);
                }

                res.json(sms);
            })
        };



        return Sms;
    };


    module.exports = smsService;
}());