var express = require('express');
var router = express.Router();


/* Logout. */
router.all('/', function(req, res, next) { // all signifie tout type de requete (POST, GET, DELETE, PUT...)
  app.user = null;

  res.redirect('/');
});



module.exports = router;
