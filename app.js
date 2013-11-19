
var path = require('path'),
	express = require('express'),
	connect = require('connect'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

app.root = __dirname;

io.set('log level', 1);

require('./server/config')(app, express, connect);
require('./server/router')(app);

require('./server/modules/socket')(io);

server.listen(8080);

console.info("App run on http://localhost:8080");


