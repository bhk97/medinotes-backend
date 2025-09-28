const mongoose = require('mongoose');
const db = require('../config/db');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const doctorSchema = new Schema({
	
	email:{
		type: String,
		lowercase:true,
		required: true,
		unique: true
	},
	password:{
		type: String,
		required: true,

	},
	name: {
        type: String,
        required: true
    },
	doctor_id: {
		type: String,
		required: true
	}
});

doctorSchema.pre('save', async function(){
	try{
		var user = this;
		const salt = await(bcrypt.genSalt(10));
		const hashpass = await bcrypt.hash(user.password,salt);
		user.password = hashpass;
	}catch(e){
		throw e;
	}
});
doctorSchema.methods.comparePassword = async function(userpassword){
	try{
		const isMatch = await bcrypt.compare(userpassword,this.password);
		return isMatch;
	}catch(error){
		throw error;
	}
}

const doctorModel = db.model('doctors',doctorSchema);
module.exports = doctorModel;