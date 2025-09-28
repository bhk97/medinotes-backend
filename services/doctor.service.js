const doctorModel = require('../models/doctor.model')
const patientModel = require('../models/patient.model')
const jwt = require('jsonwebtoken')
class doctorService{
	static async registerUser(email, password,name, doctor_id){
		try{
			const createUser = new doctorModel({email, password,name, doctor_id});
			return await createUser.save();
		}catch(err){
			throw err;
		}
	}
	static async deleteuser(doctor_id) {
		const resp = await doctorModel.findOneAndDelete({doctor_id});
		return resp;
	}

	static async checkuser(email){
		try{
			return await doctorModel.findOne({email});
		}catch(error){
			throw error;
		}
	}
	static async generateToken(tokenData,secretKey,jwt_expire){
		return jwt.sign(tokenData, secretKey,{expiresIn: jwt_expire});
	}
	static async getUserdata(doctor_id){
		const resdata = await doctorModel.find({doctor_id});
		return resdata;
	}
	static async getAllUserdata(doctor_id){
		const resdata = await patientModel.find({doctor_id});
		return resdata;
	}
	static async updateUserData(doctor_id,updatedDetails){
		const resdata = await doctorModel.findOneAndUpdate({doctor_id},updatedDetails,{new:true});
		console.log(resdata)
		return resdata;
	}	
}
module.exports = doctorService;