var express = require('express');
var router = express.Router();
const User = require('../models/UsersModel');

/* GET users listing. */
router.post('/login', function(req, res, next) {
  	User.findOne({email: req.body.email}, (err,user)=>{
		  if (err) return next(err);
		  if (!user) return res.status(401).end('no user found');
		  if (!user.validPassword(req.body.password)) return res.status(401).end('incorrect password');
		  res.status(200).end('login succesfull');
	  })
});

module.exports = router;
