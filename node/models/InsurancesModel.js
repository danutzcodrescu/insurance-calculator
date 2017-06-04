var mongoose = require('mongoose');

const InsuranceSchema= new mongoose.Schema({
        User: { type: String },
        Name: { type: String },
		CarMake: {type: String },
		Value: {type: Number},
		Status: {type: String},
		Price: {type: Number}
    },
	{timestamps: true});


const Insurances=mongoose.model('Insurances', InsuranceSchema);

module.exports=Insurances;