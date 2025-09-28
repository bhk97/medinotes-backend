const doctorService = require('../services/doctor.service');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

exports.register = async(req,res,next)=>{
	try{
		const {email, password,name, doctor_id} = req.body;
		const sucessRes = await doctorService.registerUser(email, password,name, doctor_id);
		res.json({status:true,success:"doctor registered succesfully"});

	} catch(error){
		throw error;
	}
}
exports.getUser = async (req, res, next)=>{
	 try{
	 	const {userid} = req.body.userid;
	 	let result = await doctorService.getUserdata(userid);
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
		let result = await doctorService.updateUserData(userid,updatedDetails);
		res.json({status:true,success:result});
	}catch(error){
		next(error);
	}
}
exports.getAllUser = async (req, res, next)=>{
	 try{
	 	const doctor_id = req.params.doctor_id
	 	let result = await doctorService.getAllUserdata(doctor_id);
	 	res.json({status:true,success:result});
	 }catch(error){
	 	console.log(error)
	 	next(error);
	 }
}


exports.deletestudentController = async (req,res,next)=>{
	try{
		const userid = req.body.userid;
		let res = await doctorService.deleteuser(userid);
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
		const user = await doctorService.checkuser(email);
		if(!user){
			return res.json({status:false,result:"No user found"})
		}
		const isMatch = await user.comparePassword(password);
		if(isMatch === false){
			return res.json({status:false,result:"incorrect password"})
		}
		let tokenData = {userid:user.doctor_id,email:user.email};
		console.log(tokenData)
		const token = await doctorService.generateToken(tokenData,process.env.SECRET_KEY,"1y");
		res.status(200).json({status:true,token:token});
	} catch(error){
		console.log(error);
		res.status(500).json({status:false});
	}
}

