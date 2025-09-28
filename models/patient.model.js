const mongoose = require('mongoose');
const db = require('../config/db');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const patientSchema = new Schema({
	
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
	user_id: {
		type: String,
		required: true
	},
	doctor_id: {
		type: String,
		required: true
	}
});

patientSchema.pre('save', async function(){
	try{
		var user = this;
		const salt = await(bcrypt.genSalt(10));
		const hashpass = await bcrypt.hash(user.password,salt);
		user.password = hashpass;
	}catch(e){
		throw e;
	}
});
patientSchema.methods.comparePassword = async function(userpassword){
	try{
		const isMatch = await bcrypt.compare(userpassword,this.password);
		return isMatch;
	}catch(error){
		throw error;
	}
}

const patientModel = db.model('patients',patientSchema);
module.exports = patientModel;