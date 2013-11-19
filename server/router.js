
module.exports = function(app) {

	app.get('/', function(req, res){
		res.render('index', { title: 'Node Express Example'});
	});
	
	app.get('/link1', function(req, res){
		res.render('link1', { title: 'Link 1 Example'});
	});
	
	app.get('/link2', function(req, res){
		res.render('link2', { title: 'Link 2 Example'});
	});
	
	app.get('/chat', function(req, res){
		res.render('chat', { title: 'Chat Socket.io Example'});
	});
	
	app.get('/form', function(req, res){
		res.render('form', { title: 'Form Example'});
	});
	
	app.post('/post', function(req, res){
		
		// @dependency for req.body => app.use(connect.urlencoded());
		
		var data = "No data";
		
		if (req.body) {
			data = JSON.stringify(req.body);
		}
		
		res.send('<a href="/form">Back to Form</a><br/><br/>Data : ' + data);
	});
	
	app.all('*', function(req, res){
		res.redirect('/'); 
	});
	
};