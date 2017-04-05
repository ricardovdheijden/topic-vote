angular.module('topicVote', ['ngRoute', 'topicsService'])

.config(function($routeProvider){
	$routeProvider
	.when('/', {
		redirectTo: '/home'
	})
	.when('/home', {
		templateUrl: '/pages/home.html'
	})
	.when('/all', {
		templateUrl: '/pages/all.html'
	})
	.otherwise({
		redirectTo: '/'
	})
});
