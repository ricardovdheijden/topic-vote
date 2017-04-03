var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;
var topicRouter = express.Router();

/* 
 * Array with objects, each object is a topic with the name and the upvotes/downvotes
 * _id:       generated id to identify the post (normally created by mongoDb)
 * name:      the name of the topic
 * upvotes:   amount of upvotes
 * downvotes: amount of downvotes
 */ 
var topics = [
	{
		_id: 0,
		name: "Topic 1",
		upvotes: 0,
		downvotes: 0
	}, {
		_id: 1,
		name: "Topic 2",
		upvotes: 0,
		downvotes: 0
	}, {
		_id: 2,
		name: "Topic 3",
		upvotes: 0,
		downvotes: 0
	}
];
var topicIdCounter = 3;

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

/*
 * Router containing the GET and POST methods for the /topics route
 */
topicRouter.route('/topics')
	/*
	 * GET returns the contents of the topics array and filters beforehand if needed.
	 * limit: returns the first x topics, where x is the amount specified as 'limit'
	 */
	.get(function(req, res) {
		if (req.query.limit > 0) {
			res.json(topics.slice(0, req.query.limit));
		} else {
			//Returning the full collection of topics as json
			res.json(topics);
		}
	})
	.post(function(req, res) {
		/* 
		 * Filling the topic object with only specific fields.
		 * This filters possible unwanted fields that are sent through req.body
		 * req.body contains the JSON object parsed by body-parser
		 */
		var topic = {};
		topic._id = topicIdCounter++;
		topic.name = req.body.name;
		topic.upvotes = 0;
		topic.downvotes = 0;

		/*
		 * Adding the topic object to the collection and returning it as
		 * reference since _id, upvotes and downvotes are created by the API
		 */
		topics.push(topic);
		res.status(201).send(topic);
	});

// Mapping "/api" before the routers (example: /api/topics)
app.use('/api', topicRouter);

app.listen(port, function() {
	console.log('Port: ' + port);
});