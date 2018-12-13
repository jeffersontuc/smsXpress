(function () {
    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');

    const routes = require('./routes/index.js');

    const database = require('./db/db.js');

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

    database();

}());