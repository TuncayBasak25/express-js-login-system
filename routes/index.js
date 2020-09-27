var express = require('express');
var router = express.Router();

let user = null;

let usernameList = [];
let passwordList = [];

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

  if (usernameList.includes(req.body.username))
  {
    console.log("This username is taken.");
    res.render('register');
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

  if (!usernameList.includes(req.body.username))
  {
    console.log("User don't exists.");
    res.render('login');
    return;
  }

  if (passwordList[usernameList.indexOf(req.body.username)] !== req.body.password)
  {
    console.log("password is wrong");
    res.render('login');
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
