describe('topicVote.topicVoteController', function() {
	

	it('should initialize', function() {
		module('topicVote');

		var scope = {};
		var ctrl;

		inject(function($controller, topicsHttp) {
			ctrl = $controller('topicVote', {$scope: scope});
		});

	});
});