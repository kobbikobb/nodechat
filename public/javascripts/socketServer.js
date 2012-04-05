var stringFuncs = require('./stringFunctions.js');

var messages = [];

function listen(app)
{
    var io = require("socket.io").listen(app);

    io.sockets.on('connection', function (socket) {
               
        socket.emit('messages', messages);
        
        socket.on('message', function (data) {
            
            var username;
            socket.get('username', function (err, user) {
                 username = user;
              });   
          
            data.name = username;
            data.time = stringFuncs.getIcelandicDateString();
            messages.unshift(data);
            
            io.sockets.emit('message', data);
        }); 
        
        socket.on('register', function (user) {
            socket.set('username', user);
        });
    });
}

exports.listen = listen;