const PORT = 3011;

var express = require('express');
var app = express();
var server = app.listen(PORT);
app.use(express.static('public'))
console.log("Server running on port " + PORT);
