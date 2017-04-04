angular.module('topicVote', [])

.controller('topicVoteController', ['$http', function($http) {
	// Initiating variables needed
	var self = this;
	self.topics = [];

	/*
	 * Fetching the topics using a http GET to the api.
	 * If the fetch went successful, the response will be assigned to self.topics
	 * limit (number): limit the amount of results (0 returns all results)
	 * sortBy (string): sort by the given property of the topics object
	 * descending (boolean): true (descending), false (ascending), undefined (ascending)
	 */
	self.fetchTopics = function(limit, sortBy, descending) {
		$http({
			url: '/api/topics',
			method: 'GET',
			params: {
				limit: limit,
				sortBy: sortBy,
				descending: descending
			}
		})
		.then(function(response) {
			self.topics = response.data;
		});
	};

	/*
	 * This function is invoked when the user presses the submit button.
	 * If the topicName is filled, submitting to the api will be executed
	 * The 'topic' object is created and the 'name' field is filled with the 'topicName'.
	 * Once the POST went successful the response (the topic object from the api) will be
	 * added to the already fetched topics and the inputfield will be reset.
	 */
	self.submitTopic = function(topicName) {
		if (topicName) {
			var topic = {};
			topic.name = topicName;
			$http({
				url: '/api/topics',
				method: 'POST',
				data: topic
			})
			.then(function(response) {
				self.topic = "";
				self.fetchTopics(20, 'upvotes', true);
			});
		}
	};

	// Initially fetch the topics
	self.fetchTopics(20, 'upvotes', true);
}]);
