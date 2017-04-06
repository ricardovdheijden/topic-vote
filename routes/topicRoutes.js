var express = require('express');

var routes = function(topics, topicIdCounter) {
	var topicRouter = express.Router();

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
			// Checks if the length of the input does not exceed 255 characters
			if (req.body.name.length > 255) {
				// Responding with error status and message
				res.status(500).json({
					errorMessage: 'the input exceeds 255 characters'
				})
			} else {
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
				res.status(201).json(topic);
			}
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
				res.status(500).json({
					errorMessage: 'topic not found'
				});
			}
		});

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
	
	return topicRouter
};

module.exports = routes;
