var express = require('express');
var app = express();
var port = 3000;

// Making the content of "/public/" folder available as "localhost:3000/" to serve static files
app.use('/', express.static(__dirname + '/public/'));

// Mapping "/api/hello" to respond with a function
app.get('/api/hello', function(req, res) {
	var response = {hello: "world"};
	res.json(response);
});

app.listen(port, function() {
	console.log('Port: ' + port);
});