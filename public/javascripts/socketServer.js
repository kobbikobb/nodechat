var stringFuncs = require('./stringFunctions.js');

var messages = [];
var users = [];

function userExists(user)
{
	for(var i = 0; i < users.length; i++){
		if(users[i].username === user.username)
			return true;
	}
	return false;	
}

function listen(app)
{
    var io = require("socket.io").listen(app);

    io.sockets.on('connection', function (socket) {
               
        socket.emit('messages', messages);
        socket.emit('users', users);
        
        socket.on('message', function (data) {
            
            /*var username;
            socket.get('username', function (err, user) {
                 username = user;
              });   
          
          	if(data.name == null)
            	data.name = username;
            */
            data.time = stringFuncs.getIcelandicDateString();
            messages.push(data);
            io.sockets.emit('message', data);
             
            var user = {username: data.username};
			if(!userExists(user)){
				users.push(user);
            	io.sockets.emit('user', user);
			} 
			    
            
        }); 
        
        /*socket.on('register', function (user) {
            socket.set('username', user);
        });*/
    });
}

exports.listen = listen;