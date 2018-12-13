(function () {
    const mongoose = require('mongoose');
    const db_config = require('./config.js');

    var db_url = db_config.db_url;


    var initDb = function(){
        mongoose.connect(db_url, { useNewUrlParser: true }, function(err) {
            if (err) {
                console.log(err);
                // res.status(err.status || INTERNAL_ERROR);
                // res.render('error', {
                //     message: err.message,
                //     error: err
                // });
            } else {
                console.log('smsXpress db connected!');
            }
        });
    };


    module.exports = initDb;
}());