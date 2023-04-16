const express=require('express');
const router=express.Router();
const passport=require('passport');
const allReport=require('../models/report');

router.get('/:status',async (req,res)=>{
    const rp=req.params.status;
     try{
        const doc=await allReport.find({status:rp});
        
        res.status(200).json({
            message:"All report of ${status} are",
            Reports:doc,
        })

     }catch{
        console.log(err);
        res.status(200).json({
            message:"Internal Server Error",
        })
     }
})





module.exports=router;