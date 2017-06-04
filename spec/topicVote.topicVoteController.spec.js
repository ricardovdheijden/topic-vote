describe('topicVote.topicVoteController', function() {
	var $controller, UsersController;

	beforeEach(angular.mock.module('topicVote'));

	// Inject the $controller service to create instances of the controller (topicVoteController) we want to test
	beforeEach(inject(function(_$controller_) {
	  $controller = _$controller_;
	  topicVoteController = function() {
            return $controller('topicVoteController', {
                '$scope': scope,
                'topicsHttp': topicsHttp
            });
        };
	}));

	// Verify our controller exists
	it('should be defined', function() {
	  expect(topicVoteController).toBeDefined();
	});
});
