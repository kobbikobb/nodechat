exports.index = function(req, res){
  res.render('index');
};

exports.login = function(req, res){
  res.render('login', {redir: req.query.redir});
};

exports.logout = function(req, res){
  delete req.session.user;
  res.redirect('/login');
};