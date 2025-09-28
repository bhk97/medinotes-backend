const patientModel = require('../models/patient.model')
const jwt = require('jsonwebtoken')
class patientService{
	static async registerUser(email, password,name, user_id, doctor_id){
		try{
			const createUser = new patientModel({email, password,name, user_id, doctor_id});
			return await createUser.save();
		}catch(err){
			throw err;
		}
	}
	static async deleteuser(user_id) {
		const resp = await patientModel.findOneAndDelete({user_id});
		return resp;
	}

	static async checkuser(email){
		try{
			return await patientModel.findOne({email});
		}catch(error){
			throw error;
		}
	}
	static async generateToken(tokenData,secretKey,jwt_expire){
		return jwt.sign(tokenData, secretKey,{expiresIn: jwt_expire});
	}
	static async getUserdata(user_id){
		const resdata = await patientModel.find({user_id});
		return resdata;
	}
	static async getAllUserdata(){
		const resdata = await patientModel.find();
		return resdata;
	}
	static async updateUserData(user_id,updatedDetails){
		const resdata = await patientModel.findOneAndUpdate({user_id},updatedDetails,{new:true});
		console.log(resdata)
		return resdata;
	}	
}
module.exports = patientService;