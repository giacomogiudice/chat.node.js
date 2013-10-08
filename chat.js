var net = require('net');
var sockets = [];
var s = net.Server(function(socket)
	{
		sockets.push(socket);
		console.log("user " + sockets.length + " connected");
		socket.on('data',function(d)
		{
			var i = sockets.indexOf(socket);
			for(var i=0; i<sockets.length; i++)
			{
				if(socket != sockets[i])
				{
						sockets[i].write("User "+ (i+1) + "> " + d);
				}
			}
		});

		socket.on('end',function()
		{	
			var i = sockets.indexOf(socket);
			console.log("user" + (i+1) + " disconnected");
			delete sockets[i];
		});
	});
s.listen(8000);
console.log("server started");
