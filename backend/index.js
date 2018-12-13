(function () {
    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const path = require("path");

    const routes = require('./routes/index.js');

    const database = require('./db/db.js');

    const PORT = process.env.PORT || 8080;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.static(path.join(__dirname, '/../frontend')));

    app.use('/api', routes);

    app.get('/', function(req, res){
        res.sendFile('/home/jefferson/workspace/smsXpress/frontend/index.html');
    });

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/../frontend/index.html'));
    });

    app.listen(PORT, function(){
        console.log('server running on port ' + PORT);
    });

    database();

}());