const express=require('express');
const router=express.Router();
const Doctors=require('../models/doctors');
const passport = require('passport');
const jwt=require('jsonwebtoken');

router.post('/register',async (req,res)=>{
    try{
        const doc=new Doctors({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        });
        doc.save();
        res.status(200).json({
            message:"Your register is scusses",
            doc:doc,
        });

    }catch(err){
        res.status(400).json({
            message:"error is ocure",
            error:err,
        });
    }
});
router.post('/login',async (req,res)=>{
      try{
         const doc=await Doctors.findOne({email:req.body.email});
         console.log(doc);
         if (!doc || doc.password != req.body.password){
             res.status(422).json({
                message: "Invalid username or password"
            });
        }

       res.status(200).json({
            message: 'Sign in successful, here is your token, please keep it safe!',
            data:  {
                 token:jwt.sign(doc.toJSON(),'akashion', { expiresIn:"24h"} )
            }
        })
     }catch(err){
        console.log("error is",err);
           res.status(401).json({
            message:"not a valid user",
          })
      }
});


module.exports=router;