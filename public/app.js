angular.module('topicVote', [])

.controller('topicVoteController', ['$http', function($http) {
	var self = this;

	$http.get('/api/topics').then(function(response) {
		self.topics = response.data;
	});
}]);
