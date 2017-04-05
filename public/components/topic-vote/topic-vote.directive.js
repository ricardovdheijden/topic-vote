angular.module('topicVote')

.directive('topicVote', function() {
	return {
		restrict: 'E',
		templateUrl: 'components/topic-vote/topic-vote.html',
		controller: 'topicVoteController',
		controllerAs: 'topicVoteCtrl',
		scope: {
			limit: '@',
			sortby: '@',
			descending: '@'
		}
	};
});
