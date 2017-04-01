var express = require('express');

var app = express();

var port = 3000;

app.get('/hello', function(req, res) {
	var response = {hello: "world"};
	res.json(response);
});

app.listen(port, function() {
	console.log('Port: ' + port);
});