//This file is a test of mongoose

let mongoose = require('mongoose');

//connect to mongo
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {

    //with mongoose, we need to define a schema first for data
    let kittySchema = new mongoose.Schema({
        name: String
    });

    //adding a method to the kitty schema
    kittySchema.methods.speak = function () {
        let greeting = this.name
            ? "Meow name is " + this.name
            : "I don't have a name";
        console.log(greeting);
    };

    //converting to a model in necessary then to create mongo documents
    let Kitten = mongoose.model('Kitten', kittySchema);

    let silence = new Kitten({ name: 'Silence' });
    console.log(silence.name); // 'Silence'
    silence.speak();

    let fluffy = new Kitten({ name: 'fluffy' });

    //saving fluffy in the db
    fluffy.save(function (err, fluffy) {
        if (err) return console.error(err);
        fluffy.speak();
    });

    //logs every cat in kittens using the Kitten model
    Kitten.find(function (err, kittens) {
        if (err) return console.error(err);
        console.log(kittens);
    });

    //search the db
    Kitten.find({ name: /^fluff/ }, console.log());

    console.log("script is done");
});