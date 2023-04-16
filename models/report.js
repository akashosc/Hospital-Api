const mongoose=require('mongoose');


const reportsSchema=new mongoose.Schema({
    Dname:{
        type:String,
        requried:true,
    },
    status:{
        type:String,
        requried:true,
    },
    date:{
        type:String,
        requried:true,
    },
    Pno:{
        type:String,
        requried:true,
    },
});

const reportsuser=mongoose.model('reportsuser',reportsSchema);
module.exports=reportsuser;