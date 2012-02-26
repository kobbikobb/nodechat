
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();
var io = require("socket.io").listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

// Sockets
var messages = [];

function getIcelandicDateString()
{
    var d = new Date();

    return pad(d.getDate()) + "/" + pad(d.getMonth() + 1) + " " + pad(d.getHours()) + ":" + pad(d.getMinutes());
}

function pad(number)
{
    if(number < 10)
        return "0" + number;
    return number;

}

io.sockets.on('connection', function (socket) {
    socket.emit('messages', messages);
    socket.on('message', function (data) {
        data.time = getIcelandicDateString();
        messages.unshift(data);
        io.sockets.emit('message', data);
    });
});

