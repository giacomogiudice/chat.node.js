var net = require('net');
var clients = [];
var server = net.Server(function(socket)
{
	//new user
	clients.push(socket);
	console.log("user " + clients.length + " connected from " +  socket.remoteAddress);
	broadcast("<New user connected>\n",socket);

	socket.on('data',function(d)
	{
		broadcast("User " + (clients.indexOf(socket)+1) + "> ",socket);
		broadcast(d,socket);
	});
	socket.on('end',function()
	{	
		var i = clients.indexOf(socket);
		console.log("user " + (i+1) + " disconnected");
		broadcast("<User "+ (i+1) + " disconnected>\n",socket);
		clients.splice(i,1);
	});
	socket.on('error',function(e)
	{
		console.log(e);
	});
});

server.listen(8000);
console.log("server started");

function broadcast(message, author)
{
	for(var i=0; i<clients.length; i++)
	{
		
		if(author != clients[i])
		{
			clients[i].write(message);
		}
	}
}
