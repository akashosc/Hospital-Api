const mongoose=require('mongoose');


const doctorSchema=new mongoose.Schema({
    name:{
        type:String,
        requried:true,
    },
    email:{
        type:String,
        requried:true,
    },
    password:{
        type:String,
        requried:true,
    }
});

const doctoruser=mongoose.model('doctoruser',doctorSchema);
module.exports=doctoruser;