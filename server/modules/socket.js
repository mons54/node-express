

module.exports = function (io) {
	
	var allMessages = {
		messages: {},
		id: 0
	};
	
	var allSockets = io.sockets.on('connection', function (socket) {
		
		socket.on('chooseName', function (data) {
			
			if (!data.name) {
				return;
			}
			
			socket.name = data.name;
			
			socket.emit('ready', { name: data.name });
			
			sendAllMessages();
		});
		
		socket.on('newMessage', function (data) {
			
			allMessages.id++;
			allMessages.messages[allMessages.id] = {
				name: socket.name,
				message: data.message,
			};
			
			sendAllMessages();
		});
		
		function sendAllMessages () {
			// send All sockets
			allSockets.emit('messages', allMessages.messages);
		}
	});
};