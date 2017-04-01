var express = require('express');
var app = express();
var port = 3000;

// Making the content of specific folders available to serve static files
app.use('/', express.static(__dirname + '/public/'));
app.use('/vendor/angular', express.static(__dirname + '/node_modules/angular/'));

// Mapping "/api/hello" to respond with a function
app.get('/api/hello', function(req, res) {
	var response = {hello: "world"};
	res.json(response);
});

app.listen(port, function() {
	console.log('Port: ' + port);
});