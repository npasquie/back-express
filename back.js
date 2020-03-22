const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
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
        res.status(404).send('Erreur 404');
    });
    //best practice reminder : add next argument and next() call at end of the get calls

    app.listen(3000, function () {
        console.log('Example app listening on port 3000!')
    });
});