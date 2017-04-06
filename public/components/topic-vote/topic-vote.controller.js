angular.module('topicVote')

.controller('topicVoteController', ['$scope','topicsHttp', function($scope, topicsHttp) {
	// Initiating variables needed
	var self = this;
	self.topics = [];
	// Setting error variables to false in error object and errorMessage string empty that are used in html to show errors
	self.errorMessage = '';
	self.topicsHttpError = {
		fetch: false,
		submit: false,
		vote: false
	};
	// Parameters that can be entered in the directive and will be used in the controller
	self.resultParameters = {
		limit: $scope.limit,
		sortby: $scope.sortby,
		descending: $scope.descending
	};

	/*
	 * Fetching the topics from the api using the topicsHttp factory
	 * If the fetch went successful, the response will be assigned to self.topics
	 * limit (number): limit the amount of results (0 returns all results)
	 * sortBy (string): sort by the given property of the topics object
	 * descending (boolean): true (descending), false (ascending), undefined (ascending)
	 * Assuming that fetching does noet fail
	 */
	self.fetchTopics = function(limit, sortBy, descending) {
		self.topicsHttpError.fetch = false;
		topicsHttp.fetch(limit, sortBy, descending).then(function(response) {
			// Successful callback
			self.topics = response.data;
		}, function() {
			// In case of an error
			self.topicsHttpError.fetch = true;
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
		// Checking if the topic name does not exceed 255 characters
		if (topicName.length <= 255) {
			// Resetting error status and errorMessage
			self.topicsHttpError.submit = false;
			self.errorMessage = '';
			// Creating a local topic object to send to the api
			var topic = {};
			topic.name = topicName;
			topicsHttp.submit(topic).then(function(response) {
				// Successful callback: resetting the inputfield only when the POST succeeds
				self.topic = '';
				self.fetchTopics(self.resultParameters.limit, self.resultParameters.sortby, self.resultParameters.descending);
			}, function(response) {
				// In case of an error
				self.topicsHttpError.submit = true;
				self.errorMessage = response.data.errorMessage;
			});
		} else {
			// Showing error message instead of submitting the topic
			self.topicsHttpError.submit = true;
			self.errorMessage = 'the input exceeds 255 characters';
		}
	};

	/*
	 * This function is invoked when the user presses one of the voting links
	 * topicId (number): the id of the topic where is voted on
	 * downvote (boolean): passing through if this is a downvote (true) or upvote (false)
	 * Assuming that voting does not fail
	 */
	self.voteTopic = function(topicId, downvote) {
		self.topicsHttpError.vote = false;
		topicsHttp.vote(topicId, downvote).then(function(response) {
			// Successful callback
			self.fetchTopics(self.resultParameters.limit, self.resultParameters.sortby, self.resultParameters.descending);
		}, function() {
			// In case of an error
			self.topicsHttpError.vote = true;
		});
	}

	// Initially fetch the topics when the page loads (and this controller gets loaded)
	self.fetchTopics(self.resultParameters.limit, self.resultParameters.sortby, self.resultParameters.descending);
}]);
