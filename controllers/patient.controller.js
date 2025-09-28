const patientService = require('../services/patient.service');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

exports.register = async(req,res,next)=>{
	try{
		const {email, password,name, user_id, doctor_id} = req.body;
		const sucessRes = await patientService.registerUser(email, password,name, user_id, doctor_id);
		res.json({status:true,success:"patient registered succesfully"});

	} catch(error){
		throw error;
	}
}
exports.getUser = async (req, res, next)=>{
	 try{
	 	const {userid} = req.body.userid;
	 	let result = await patientService.getUserdata(userid);
	 	console.log(result)
	 	res.json({status:true,success:result});
	 }catch(error){
	 	next(error);
	 }
}

exports.updateUser = async (req, res,next)=>{
	try{
		const userid = req.params.userid;
		const updatedDetails = req.body;
		let result = await patientService.updateUserData(userid,updatedDetails);
		res.json({status:true,success:result});
	}catch(error){
		next(error);
	}
}
exports.getAllUser = async (req, res, next)=>{
	 try{
	 	
	 	let result = await patientService.getAllUserdata();
	 	res.json({status:true,success:result});
	 }catch(error){
	 	console.log(error)
	 	next(error);
	 }
}


exports.deletestudentController = async (req,res,next)=>{
	try{
		const userid = req.body.userid;
		let res = await patientService.deleteuser(userid);
		res.json({status: true, message:"true success in deleting"});
	}
	catch(e){
		console.log(e);
		res.json({status:false, message:"Not deleted"});
	}
}
exports.login = async(req,res,next)=>{
	try{
		const {email, password} = req.body;
		const user = await patientService.checkuser(email);
		if(!user){
			return res.json({status:false,result:"No user found"})
		}
		const isMatch = await user.comparePassword(password);
		if(isMatch === false){
			return res.json({status:false,result:"incorrect password"})
		}
		let tokenData = {userid:user.userid,email:user.email};
		const token = await patientService.generateToken(tokenData,process.env.SECRET_KEY,"1y");
		res.status(200).json({status:true,token:token});
	} catch(error){
		console.log(error);
		res.status(500).json({status:false});
	}
}

