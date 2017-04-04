angular.module('topicsService', [])

.factory('topicsHttp', ['$http', function topicsHttpFactory($http) {
	return {
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
		submit: function(topic) {
			return $http({
				url: '/api/topics',
				method: 'POST',
				data: topic
			});
		},
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