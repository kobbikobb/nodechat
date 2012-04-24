var stringFuncs = require('./stringFunctions.js');

var messages = [];
var users = [];

function removeUser(user)
{
	for(var i = 0; i < users.length; i++) {
		if(users[i].username === user.username) {
			users.splice(i,1);
			i--;
			return;
		}
	}	
}

function listen(app)
{
    var io = require("socket.io").listen(app);

    io.sockets.on('connection', function (socket) {
	
        socket.emit('messages', messages);
        socket.emit('users', users);
        
 		function getUser()
		{
			var user;
			socket.get('user', function (err, userData) {
			     user = userData;
			  }); 
			return user;        
		}         

        socket.on('message', function (data) {
	        data.username = getUser().username;
          
            data.time = stringFuncs.getIcelandicDateString();
            messages.push(data);
            
            io.sockets.emit('message', data);
        }); 
        
        socket.on('register', function (username) {
            var user = {username: username};
            
            socket.set('user', user);
            users.push(user);
            io.sockets.emit('user', user);
        });
        
        socket.on('disconnect', function() {
        	removeUser(getUser());
        	
        	io.sockets.emit('users', users);
        });
    });
}

exports.listen = listen;