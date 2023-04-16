const mongoose=require('mongoose');


const patientsSchema=new mongoose.Schema({
    mobile:{
        type:String,
        requried:true,
    },
    name:{
        type:String,
        requried:true,
    }
});

const patientuser=mongoose.model('patientuser',patientsSchema);
module.exports=patientuser;