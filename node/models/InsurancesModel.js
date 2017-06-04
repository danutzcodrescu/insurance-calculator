var mongoose = require('mongoose');
const sendMail = require('../helpers/sendMail');

const InsuranceSchema= new mongoose.Schema({
        User: { type: String },
        Name: { type: String },
		CarMake: {type: String },
		Value: {type: Number},
		Status: {type: String},
		Price: {type: Number}
    },
	{timestamps: true});

InsuranceSchema.post('save', function () {
    const insurance = this;
    if (insurance.Status==="OK") {
		const { Name, CarMake, Value, Price } = insurance;
		sendMail("danutzcodrescu@gmail.com", Name, CarMake, Value, Price);
	}
});
	


const Insurances=mongoose.model('Insurances', InsuranceSchema);

module.exports=Insurances;