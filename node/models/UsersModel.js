var mongoose = require('mongoose');

const passwordHash=require('password-hash');


var UserSchema= new mongoose.Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, equired: true }
    },
	{timestamps: true});

UserSchema.pre('save', function(next) {
    let user = this;
	user.password = passwordHash.generate(user.password);
	next();
});

UserSchema.methods.validPassword = function(password) {
	console.log(password, this.password);
    return passwordHash.verify(password, this.password);
};

var Users=mongoose.model('Users', UserSchema);

module.exports=Users;