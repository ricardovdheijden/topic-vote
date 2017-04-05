angular.module('topicsService', [])

/*
 * The factory contains functions to make service calls to the api
 */
.factory('topicsHttp', ['$http', function topicsHttpFactory($http) {
	return {
		// Fetching topics which can be sorted and limited in the api (less traffic)
		fetch: function(limit, sortBy, descending) {
			return $http({
				url: '/api/topics',
				method: 'GET',
				params: {
					limit: limit,
					sortBy: sortBy,
					descending: descending
				}
			});
		},
		// Submitting a topic to the api
		submit: function(topic) {
			return $http({
				url: '/api/topics',
				method: 'POST',
				data: topic
			});
		},
		// Voting on a specific topic, including what kind of vote (downvote: true or false)
		vote: function(topicId, downvote) {
			return $http({
				url: '/api/topics/vote',
				method: 'POST',
				data: {
					_id: topicId,
					downvote: downvote
				}
			});
		}
	};
}]);