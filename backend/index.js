const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

const routes = require('./routes/index.js');

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('../frontend/'));

app.use('/', routes);

app.get('/', function(req, res){
    res.sendFile('index.html');
});

app.listen(PORT, function(){
    console.log('server running on port ' + PORT);
});


var db_url = 'mongodb://localhost:27017/smsXpress';

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