var express = require('express');
var router = express.Router();
const User = require('../models/UsersModel');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/login', function(req, res, next) {
  	User.findOne({email: req.body.email}, (err,user)=>{
		  if (err) return next(err);
		  if (!user) return res.status(401).end('no user found');
		  if (!user.validPassword(req.body.password)) return res.status(401).end('incorrect password');
		  const token = jwt.sign({email: user.toObject().email}, process.env.APP_SECRET, 
		  	{ expiresIn: '9h' });
		  res.status(200).end(token);
	  })
});

module.exports = router;
