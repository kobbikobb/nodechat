// Module dependencies.
var express = require('express')
    ,routes = require('./routes')
    ,modules = require('./public/javascripts/socketServer');

var app = module.exports = express.createServer();
var app = express.createServer();

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
app.get('/users', routes.users);

//Socket server
modules.listen(app);

//Start the server
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
