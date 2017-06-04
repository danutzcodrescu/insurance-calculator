const User = require('../models/UsersModel');
const jwt = require('jsonwebtoken');

const authenticationCheck = (req, res, next) => {
  if(req.method==="POST") {
    if (req.headers['x-token']) {
		const token = jwt.verify(req.headers['x-token'], process.env.APP_SECRET);
		console.log(token);
		User.findOne({email: token.email}, (err, user)=>{
			if (err) return res.status(500).end('server error');
			if (!user) return res.status(401).end('not authenticated');
			next();
		});
    } else {
        res.status(500).end('not logged in');
    }
  } else {
    next();
  } 
}

module.exports = authenticationCheck;