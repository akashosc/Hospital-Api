const express=require('express');
const router=express.Router();
const passport=require('passport');
const allReport=require('../models/report');
const Patient=require('../models/patientsUser');

router.get('/:status',async (req,res)=>{
    const rp=req.params.status;
     try{
        const doc=await allReport.find({status:rp});
        const Reportofpatient=[];
        for(let i=0;i<doc.length;i++){
            const patient =await Patient.findOne({mobile:doc[i].Pno});
             
            Reportofpatient.push(patient);
        }
        res.status(200).json({
            message:`All patients of ${rp} status Report  are`,
            Reportofpatient:Reportofpatient,
        })

     }catch(err){
        console.log(err);
        res.status(200).json({
            message:"Internal Server Error",
        })
     }
})





module.exports=router;