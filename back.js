const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
    console.log("requête reçue");
}).use(function(req, res){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Erreur 404');
});
//best practice reminder : add next argument and next() call at end of the get calls

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});