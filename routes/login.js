var express = require('express');
var router = express.Router();

var Joi = require('joi');

let userSchema = Joi.object( {
  username: Joi.string().min(3).max(8).required(),
  password: Joi.string().min(4).max(6).required()
});

/* GET login page. */
router.get('/', function(req, res, next) {
  if (app.user)
  {
    res.redirect('/');
  }

  res.render('login');
});

/* POST login page. */
router.post('/', function(req, res, next) {
  if (app.user)
  {
    res.redirect('/');
  }

  const valid = userSchema.validate(req.body);

  if (valid.error)
  {
    res.render('login', { error: valid.error.details[0].message });
    return;
  }

  if (!app.usernameList.includes(req.body.username))
  {
    res.render('login', { error: "User don't exists.", lastUsername: req.body.username });
    return;
  }

  if (app.passwordList[app.usernameList.indexOf(req.body.username)] !== req.body.password)
  {
    res.render('login', { error: "Password is wrong.", lastUsername: req.body.username });
    return;
  }

  app.user = req.body.username;

  res.redirect('/');
});




module.exports = router;
