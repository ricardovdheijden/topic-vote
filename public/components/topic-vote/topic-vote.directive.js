angular.module('topicVote')

/*
 * This directive makes it possible to reuse the code to show the top 20 votes
 * or all votes. Passing parameters will take care of this.
 * Example:
 * <topic-vote limit=20 sortby="upvotes" descending=true></topic-vote>
 * limit (number): the maximum amount of topics to show (0 or leaving parameter out means all topics)
 * stortby (string): on what data to sort (upvotes or downvotes)
 * descending (boolean): order descending (true) or ascending (false or leaving parameter out)
 */
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
