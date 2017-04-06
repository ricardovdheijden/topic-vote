var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

/* 
 * Array with objects, each object is a topic with the name and the upvotes/downvotes
 * Normally a database (like mongoDb) is used to store this kind of data
 * _id:       generated id to identify the post (normally created by mongoDb)
 * name:      the name of the topic
 * upvotes:   amount of upvotes
 * downvotes: amount of downvotes
 * score:     calculation of upvotes - downvotes (with 0 as lowest score)
 */ 
var topics = [];

/*
 * Keeping a counter to have a unique _id created for every new topic
 * Not using array.length because the id won't be unique if some items (not the last one) are deleted
 * Normally this is handled by a database (mongoDb for example)
 */
var topicIdCounter = 0;

// Importing the topicRouter
topicRouter = require('./routes/topicRoutes.js')(topics, topicIdCounter);

/*
 * Setting up body-parser to find json objects in requests and these will be added to the body property
 */
app.use(bodyParser.json());

/*
 * Exposing the content of specific folders to be served as static content:
 * '/public' as '/': files for the UI (html/css/js), they appear to be in the root of the website (localhost:3000/index.html)
 * '/node_modules/angular/' as '/vendor/angular': files for the Angular.js framework
 */
app.use('/', express.static(__dirname + '/public/'));
app.use('/vendor/angular', express.static(__dirname + '/node_modules/angular/'));
app.use('/vendor/angular-route', express.static(__dirname + '/node_modules/angular-route/'));
app.use('/vendor/bootstrap', express.static(__dirname + '/node_modules/bootstrap/'));
app.use('/vendor/jquery', express.static(__dirname + '/node_modules/jquery/'));

// Mapping "/api" before the routers (example: /api/topics)
app.use('/api', topicRouter);

// Setting up to listen on the port defined in 'port'
app.listen(port, function() {
	console.log('Port: ' + port);
});
