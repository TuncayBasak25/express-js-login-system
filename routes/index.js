var express = require('express');
var router = express.Router();

var db = require('../models/index');


/* GET home page. */
router.get('/', async function(req, res, next) {

  const actualUser = await db.User.findOne({ where: {sessionId: req.session.id } });

  if (req.session.username)
  {
    res.render('userhome', { user: req.session.username });
  }
  else
  {
    req.session.username = "test";
    res.render('home', {title: 'Home'});
  }
});


module.exports = router;
