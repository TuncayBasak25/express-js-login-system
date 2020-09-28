var express = require('express');
var router = express.Router();

var Joi = require('joi');

let user = null;

let usernameList = [];
let passwordList = [];


let userSchema = Joi.object( {
  username: Joi.string().min(3).max(8).required(),
  password: Joi.string().min(4).max(6).required()
});

/* GET home page. */
router.get('/', function(req, res, next) {
  if (user)
  {
    res.render('userhome', { user: user });
  }
  else
  {
    res.render('home', {title: 'Home'});
  }
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  if (user)
  {
    res.redirect('/'); //If there is an user logged redirect to index
  }
  else
  {
    res.render('register');
  }
});

/* POST register page. */
router.post('/register', function(req, res, next) {
  if (user)
  {
    res.redirect('/'); //If there is an user logged redirect to index
  }

  const valid = userSchema.validate(req.body);

  if (valid.error)
  {
    res.render('register', { error: valid.error.details[0].message });
    return;
  }

  if (usernameList.includes(req.body.username))
  {
    res.render('register', { error: "This username is taken.", lastUsername: req.body.username });
    return;
  }

  usernameList.push(req.body.username);
  passwordList.push(req.body.password);

  res.redirect('/login');
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  if (user)
  {
    res.redirect('/');
  }

  res.render('login');
});

/* POST login page. */
router.post('/login', function(req, res, next) {
  if (user)
  {
    res.redirect('/');
  }

  const valid = userSchema.validate(req.body);

  if (valid.error)
  {
    res.render('login', { error: valid.error.details[0].message });
    return;
  }

  if (!usernameList.includes(req.body.username))
  {
    res.render('login', { error: "User don't exists.", lastUsername: req.body.username });
    return;
  }

  if (passwordList[usernameList.indexOf(req.body.username)] !== req.body.password)
  {
    res.render('login', { error: "Password is wrong.", lastUsername: req.body.username });
    return;
  }

  user = req.body.username;

  res.redirect('/');
});

/* Logout. */
router.all('/logout', function(req, res, next) { // all signifie tout type de requete (POST, GET, DELETE, PUT...)
  user = null;

  res.redirect('/');
});



module.exports = router;
