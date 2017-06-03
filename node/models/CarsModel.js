var mongoose = require('mongoose');

const CarSchema= new mongoose.Schema({
        name: { type: String, required: true },
        fee: { type: Number, required: true },
		commission: {type: Number, required: true}
    },
	{timestamps: true});


const Cars=mongoose.model('Cars', CarSchema);

module.exports=Cars;