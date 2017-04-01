var express = require('express');
var app = express();
var port = 3000;
var topicRouter = express.Router();

// Array with objects, each object is a topic with the name and the score
var topics = [
	{
		name: "Topic 1",
		score: 0
	}, {
		name: "Topic 2",
		score: 0
	}, {
		name: "Topic 3",
		score: 0
	}
];

// Making the content of specific folders available to serve static files
app.use('/', express.static(__dirname + '/public/'));
app.use('/vendor/angular', express.static(__dirname + '/node_modules/angular/'));

// Router containing the methods for the topics route
topicRouter.route('/topics')
	.get(function(req, res) {
		res.json(topics);
	});

// Mapping "/api" before the routers (example: /api/topics)
app.use('/api', topicRouter);

app.listen(port, function() {
	console.log('Port: ' + port);
});