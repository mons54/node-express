$(document).ready(function() {
	$.start();
});

(function($){
	
	$.extend({
	
		start: function() {
			
			var socket = io.connect('http://localhost:8080');
			
			var headChat = $('<div></div>').appendTo('#chat');
			
			$('<label>Choose Name</label>').appendTo(headChat);
			var chooseName = $('<input type="text" />').appendTo(headChat);
			
			$('<button>Start the chat</button>').appendTo(headChat).click(function () {
			
				if (!$(chooseName).val()) {
					alert('Choose a name please');
					return;
				}
				
				socket.emit('chooseName', { name: $(chooseName).val() });
			});
			
			var chat = $('<div></div>').appendTo('#chat');
			
			socket.on('connect', function (data) {
				console.log('connect');
			});
			
			socket.on('ready', function (data) {
				
				$(headChat).empty().html();
				
				$('<div class="user-name">Connected to <span style="color:#930">' + data.name + '</span></div>').appendTo(headChat);
				
				var send = $('<div class="send"></div>').appendTo(headChat);
				
				$('<label>Message :</label>').appendTo(send);
				var message = $('<input type="text">').appendTo(send);
				
				$('<button>Send</button>').appendTo(send).click(function () {
					if (!$(message).val()) {
						alert('Message can not empty');
						return;
					}
					socket.emit('newMessage', { message: $(message).val() });
					
					$(message).empty().val('')
				});
				
				var table = $('<table></table>').appendTo(headChat);
				var tr = $('<tr></tr>').appendTo(table);
				$('<th width="20%">Users</th>').appendTo(tr);
				$('<th>Messages</th>').appendTo(tr);
				$.divChat = $('<tbody></tbody>').appendTo(table);
				
			});
			
			socket.on('messages', function (data) {
				
				$($.divChat).empty().html();
				
				for (var i in data) {
					var tr = $('<tr></tr>').appendTo($.divChat);
					$('<td>' + data[i].name + '</td>').appendTo(tr);
					$('<td>' + data[i].message + '</td>').appendTo(tr);
				}
			});
		},
	});
})(jQuery);