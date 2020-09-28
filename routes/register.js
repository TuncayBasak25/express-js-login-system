var express = require('express');
var router = express.Router();

var Joi = require('joi');

let userSchema = Joi.object( {
  username: Joi.string().min(3).max(8).required(),
  password: Joi.string().min(4).max(6).required()
});

/* GET register page. */
router.get('/', function(req, res, next) {
  if (app.user)
  {
    res.redirect('/'); //If there is an user logged redirect to index
  }
  else
  {
    res.render('register');
  }
});

/* POST register page. */
router.post('/', function(req, res, next) {
  if (app.user)
  {
    res.redirect('/'); //If there is an user logged redirect to index
  }

  const valid = userSchema.validate(req.body);

  if (valid.error)
  {
    res.render('register', { error: valid.error.details[0].message });
    return;
  }

  if (app.usernameList.includes(req.body.username))
  {
    res.render('register', { error: "This username is taken.", lastUsername: req.body.username });
    return;
  }

  app.usernameList.push(req.body.username);
  app.passwordList.push(req.body.password);

  res.redirect('/login');
});



module.exports = router;
