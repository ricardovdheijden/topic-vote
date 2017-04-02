angular.module('topicVote', [])

.controller('topicVoteController', ['$http', function($http) {
	// Initiating variables needed
	var self = this;
	self.topics = [];

	/*
	 * Fetching the topics using a http GET to the api.
	 * Once the GET went successful the response will be assigned to self.topics
	 */
	$http.get('/api/topics').then(function(response) {
		self.topics = response.data;
	});

	/*
	 * This function is invoked when the user presses the submit button.
	 * The 'topic' object is created and the 'name' field is filled with the 'topicName'.
	 * Once the POST went successful the response (the topic object from the api) will be
	 * added to the already fetched topics. 
	 */
	self.submitTopic = function(topicName) {
		var topic = {};
		topic.name = topicName;
		$http.post('/api/topics', topic).then(function(response) {
			self.topics.push(response.data);
		});
	};
}]);
