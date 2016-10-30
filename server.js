var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var db = mongoose.connect('mongodb://admin:123456@ds139267.mlab.com:39267/heroku_dc9spxmc');

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.listen(port, function () {
    console.log('Running on PORT: ' + port);
});

// Book API

var Book = require('./models/bookModel');
var bookRouter = require('./routes/bookRoutes')(Book);
app.use('/books', bookRouter);