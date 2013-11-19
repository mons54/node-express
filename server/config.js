
module.exports = function(app, express, connect) {

	app.configure(function(){
		app.set('views', app.root + '/server/views');
		app.set('view engine', 'jade');
		app.set('view options', { doctype: 'html', pretty: true });
		app.use(connect.urlencoded());
		app.use(connect.json());
		app.use(require('stylus').middleware({ src: app.root + '/public' }));
		app.use(express.static(app.root + '/server'));
		app.use(express.static(app.root + '/public'));
	});
};
