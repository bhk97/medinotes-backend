const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const connection = mongoose.createConnection(process.env.MONGO_URL).on('open',()=>{
	console.log("MongoDB Connected")
}).on('error',(e)=>{
	console.log("error:	", e);
});

module.exports = connection;
