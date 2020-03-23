const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config;

mongoose.connect(`mongodb://${process.env.MONGO_NAME}:${process.env.MONGO_PORT}/${process.env.DB_NAME}`,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => {console.log("connection established")})
    .catch(error => handleError(error));
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    let kittySchema = new mongoose.Schema(
        {name: String});
    let Kitten = mongoose.model('Kitten', kittySchema);

    function findCats(res){
        let resp = "";
        Kitten.find().exec( (err, kittens) => {
            if (err) return console.error(err);
            kittens.forEach(cat => {resp += cat.name + " ";});
            res.send(resp);
        });
    }

    app.get('/', function (req, res) {
        findCats(res);
    }).use(function(req, res){
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send('Error 404');
    });
    //best practice reminder : add next argument and next() call at end of the get calls

    app.listen(3000, function () {
        console.log('Express-js listening on port 3000')
    });
});