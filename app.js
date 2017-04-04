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
		upvotes: 3,
		downvotes: 0
	}, {
		_id: 1,
		name: "Topic 2",
		upvotes: 1,
		downvotes: 0
	}, {
		_id: 2,
		name: "Topic 3",
		upvotes: 2,
		downvotes: 0
	}
];
// Setting the length of the topics array as counter to have unique _id's created
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
	 * GET returns the contents of the topics array and filters beforehand with query strings if needed.
	 * limit (number): returns the first x topics, where x is the amount specified as 'limit'
	 * sortBy (string): the property of the topic objects to sort by
	 * descending (string): true(descending), false(ascending), any other value(ascending)
	 * 
	 * Leaving out the 'descending' query string results in an ascending order as well
	 * Using 'descending' works only if 'sortBy' is defined, otherwise there is no property to sort on
	 */
	.get(function(req, res) {
		// Copy the original data into topicsResponse (all references to objects are copied)
		var topicsResponse = topics.slice();
		if (req.query.sortBy) {
			var sortBy = req.query.sortBy;
			// Adding a sort function to sort on a specific property of the object
			topicsResponse.sort(function(a, b) {
				// Calling the object as an array to be able to pass the 'sortBy' string for property selection
				if (req.query.descending === 'true') return b[sortBy] - a[sortBy];
				else return a[sortBy] - b[sortBy];
			});
		}
		if (req.query.limit > 0) {
			topicsResponse = topicsResponse.slice(0, req.query.limit);
		}
		//Returning the result as collection of topics as json
		res.json(topicsResponse);
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
/*
 * Router containing the POST method to vote for a topic
 * _id (number): the id of the topic to vote for
 * downvote (boolean): adds 1 downvote (true), adds one upvote (false).
 */
topicRouter.route('/topics/vote')
	.post(function(req, res) {
		var _id = req.body._id;
		var downvote = req.body.downvote;
		// Voting for the topic and using the return value to dertermine if the vote was successful
		if (voteTopic(_id, downvote)) {
			res.status(201).send();
		} else {
			res.status(500).send();
		}
	});

// Mapping "/api" before the routers (example: /api/topics)
app.use('/api', topicRouter);

/*
 * voteTopic searches for the given 'id' and adds 1 upvote or 1 downvote
 * id (number): The id of the topic to vote for
 * downvote (boolean): adds 1 downvote (true), adds one upvote (false or undefined)
 *
 * returns (boolean): true (vote succeeded), false (vote failed)
 */
var voteTopic = function(id, downvote) {
	var success = false;
	topics.find(function(topic) {
		if (topic._id === id) {
			if (downvote) topic.downvotes++;
			else topic.upvotes++;
			// return value for the voteTopic function: adding was successful
			success = true;
			// return value for the array find function: item was found
			return true;
		} else {
			// return value for the array find function: item was not found
			return false
		}
	});
	// return value for the voteTopic function
	return success;
};

// Setting up to listen on the port defined in 'port'
app.listen(port, function() {
	console.log('Port: ' + port);
});