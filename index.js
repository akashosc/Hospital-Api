const express=require('express');
const app=express();
const dotenv=require('dotenv').config()
const port=process.env.PORT||3000;
const mongoose=require('mongoose');
const doctorsController=require('./controllers/doctors');
const patientsController=require('./controllers/patients');
const reportsController=require('./controllers/reports');
const passport=require('passport');

const passportJwt=require('./config/passport-jwt');
const session=require('express-session');
// Mongoose connection
mongoose.connect(process.env.mongoUrl,{useNewUrlParser:true}).then(()=>console.log('MongoDb connected'))
.catch(err=>console.log(err));
// Mongoose connection


app.use(express.urlencoded({extended:true}));
app.use(express.json());

// EJS plugin
app.set('view engine',"ejs");
//EJS plugin 



app.get('/',(req,res)=>{
  res.render('HospitalapiDocu');
})

app.use('/doctors',doctorsController);
app.use('/patients',passport.authenticate('jwt', {session: false}),patientsController);
app.use('/reports',passport.authenticate('jwt', {session: false}),reportsController);
app.listen(port,(err)=>{
    console.log(`Server is ready on port ${port}`);
})