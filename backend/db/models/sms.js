(function () {

    var mongoose = require('mongoose');
    const generate = require('nanoid/generate');

    var smsSchema = mongoose.Schema({
        message: {
            type: String,
            required: true,

        },

        phones: [{
            type: String
        }],

        protocol: {
            type: String,
            default: generate('1234567890abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ', 12)
        },

        sid: {
            type: String
        }


    });

    var Sms = mongoose.model('Sms', smsSchema);

    module.exports = Sms;

}());