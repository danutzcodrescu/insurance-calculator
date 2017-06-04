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

router.get('/', function(req, res, next) {
  	Insurance.aggregate({$project: {_id:0, User: 1,"Date&Time":'$createdAt', Name:1,  CarMake: 1, Value: 1, Status: 1, Price: 1 }}, (err, resp)=>{
		if (err) next(err);
		res.json(resp);
	  });
});

module.exports = router;
