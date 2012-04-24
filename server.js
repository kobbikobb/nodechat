var express = require('express')
    ,routes = require('./routes')
    ,socketServer = require('./public/javascripts/socketServer');

var MemoryStore = express.session.MemoryStore;

var app = express.createServer();

// Configuration
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(express.cookieParser());
    app.use(express.session(
    	{
    		store: new MemoryStore(), secret:'kobbikobb'
		}));
	app.use(app.router);
});

app.dynamicHelpers(
  {
    session: function(req, res) {
      return req.session;
    }
  }
);

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});


function requiresLogin(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}


// Routes
app.get('/login', routes.login);
app.get('/logout', routes.logout);

app.get('/', requiresLogin, routes.index);

app.post('/login', function(req, res) {
      req.session.user = req.body.username;
      res.redirect(req.body.redir || '/');
});

socketServer.listen(app);
app.listen(process.env['app_port'] || 3000);

console.log("The server is started!");
																