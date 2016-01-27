'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var dbConfig = require('./secret/config-maria.json');
var bluebird = require('bluebird');
var connPool = bluebird.promisifyAll(mysql.createPool(dbConfig));

//reuqire our stories controller
var storiesApi = require('./controllers/stories-api.js');

//require our story model
var Story = require('./models/story.js').Model(connPool);

//create the express application
var app = express();

//log requests
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/static'));

app.use('/api/v1', storiesApi.Router(Story));

app.listen(80, function() {
	console.log('server is listening...');
});