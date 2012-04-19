exports.index = function(req, res){
  res.render('index', {user: req.session.user});
};

exports.login = function(req, res){
  res.render('login', {redir: req.query.redir});
};

exports.logout = function(req, res){
  delete req.session.user;
  res.redirect('/login');
};