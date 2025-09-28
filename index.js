const app = require('./app');
const port = 3000;
const db = require('./config/db')
app.get('/test',(req,res)=>{
	res.send("Server started succesfully")
})
app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});