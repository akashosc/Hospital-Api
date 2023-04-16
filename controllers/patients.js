const express=require('express');
const router=express.Router();
const passport=require('passport');
const Patient=require('../models/patientsUser');
const Report= require('../models/report');

router.get('/:id/all_report',async (req,res)=>{
    const id=req.params.id;
    try{
        const doc=await Patient.findById(id);
        const docReport=await Report.find({Pno:doc.mobile});
        console.log(docReport);
        res.status(200).json({
            message:`All Reports of Patient Name ${doc.name} are`,
            Reports:docReport,
        })

    }catch(err){
        console.log("error is in all_report section",err);
        res.status(404).json({
            message:"Internal Server Error",
        })
    }
   
})

router.post('/register',async (req,res)=>{
    try{
        const doc=await Patient.findOne({mobile:req.body.mobile});
      
    if(doc){
        res.status(401).json({
            message:`Patients is register already Patient name is:-${doc.name}`
        })
    }else{
        const dumdoc=new Patient({
            mobile:req.body.mobile,
            name:req.body.name,
        });
        
        dumdoc.save();
        res.status(200).json({
            message:"register is done"
        })
    } 

    }catch(err){
        console.log("error is in register route",err);
        res.status(404).json({
            message:"Internal Server Error",
        })

    }
    
    
})
router.post('/:id/create_report',async (req,res)=>{
    const id= req.params.id;
    try{
        const doc=await Patient.findById(id);
        if(!doc){
            res.status(401).json({
                message:"patient dont exist",
            })
        }else{
            const docu=new Report({
                Dname:req.body.Dname,
                status:req.body.status,
                date:req.body.date,
                Pno:doc.mobile,
            })
            docu.save();
            res.status(200).json({
                message:`Report of patient name ${doc.name} has created`,
            })
        }
       
    }catch(err){
       console.log("error is in create_report rout",err);
       res.status(200).json({
        message:"Internal Server Error"
    })
    }
     res.status(200).json({
        message:"report has created"
     })
})





module.exports=router;