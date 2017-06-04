var express = require('express');
var router = express.Router();
const Insurance = require('../models/InsurancesModel');
const jwt = require('jsonwebtoken');
const authMiddleWare = require('../middlewares/authenticatedMiddleware');


router.use(authMiddleWare);

router.post('/', function(req, res, next) {
	let obj = req.body;
	const user = jwt.decode(req.headers["x-token"]);
	obj.User = user.email;
  	Insurance.create(obj, (err, resp)=>{
		  if (err) console.log(err);
		  res.status(200).end("success");
	  })
});

module.exports = router;
