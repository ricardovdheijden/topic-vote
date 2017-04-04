angular.module('topicVote', ['topicsService'])

.controller('topicVoteController', ['topicsHttp', function(topicsHttp) {
	// Initiating variables needed
	var self = this;
	self.topics = [];

	/*
	 * Fetching the topics from the api using the topicsHttp factory
	 * If the fetch went successful, the response will be assigned to self.topics
	 * limit (number): limit the amount of results (0 returns all results)
	 * sortBy (string): sort by the given property of the topics object
	 * descending (boolean): true (descending), false (ascending), undefined (ascending)
	 * Assuming that fetching does noet fail
	 */
	self.fetchTopics = function(limit, sortBy, descending) {
		topicsHttp.fetch(limit, sortBy, descending).then(function(response) {
			self.topics = response.data;
		});
	};

	/*
	 * This function submits a topic to the api using the topicsHttp factory
	 * If the topicName is filled, submitting to the api will be executed
	 * The 'topic' object is created and the 'name' field is filled with the 'topicName'.
	 * Once the submit is successful, the response (the topic object from the api) will be
	 * added to the already fetched topics and the inputfield will be reset.
	 * Assuming that submitting does not fail
	 */
	self.submitTopic = function(topicName) {
		if (topicName) {
			var topic = {};
			topic.name = topicName;
			topicsHttp.submit(topic).then(function(response) {
				self.topic = "";
				self.fetchTopics(20, 'upvotes', true);
			});
		}
	};

	/*
	 * This function is invoked when the user presses one of the voting links
	 * topicId (number): the id of the topic where is voted on
	 * downvote (boolean): passing through if this is a downvote (true) or upvote (false)
	 * Assuming that voting does not fail
	 */
	self.voteTopic = function(topicId, downvote) {
		topicsHttp.vote(topicId, downvote).then(function(response) {
			self.fetchTopics(20, 'upvotes', true);
		});
	}

	// Initially fetch the topics
	self.fetchTopics(20, 'upvotes', true);
}]);
