var express = require('express');
var router = express.Router();
const Car = require('../models/CarsModel');


router.get('/', function(req, res, next) {
  	Car.aggregate({$project: {_id:0, name: 1, fee:1, commission: 1}}, (err, cars)=>{
		  if (err) next(err);
		  res.json(cars)
	  })
});

module.exports = router;
