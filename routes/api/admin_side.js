
// routes for accessing FIR by the admin

const express=require('express');
const router=express.Router();
const {check,validationResult}=require('express-validator');
const auth=require('../../middleware/auth');
const  FIRDetails=require('../../models/FIRDetails');




// @route  GET api/admin_side
// @desc   GET all FIR
// @access  Private
// each FIR has a UIN(Unique Identification Number) . Every police station will be able to access only those FIR that matches with their Number
// all FIR's are then sorted based on latest FIR's
router.put('/fir',auth,[
    check('uin',"uin should exist").exists()
],async function (req,res) {
    try {
        const fir= await  FIRDetails.find({UIN:req.body.uin}).sort({date:-1});
        res.json(fir);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route  GET api/admin_side/:id
// @desc   GET post by id
// @access  Private
// This API  is for unique FIR. Every time the police clicks on a FIR all the details of that will be displayed on the portal
router.get('/:st',auth,async function (req,res) {

    try {
        console.log("hello there");

        const fir= await FIRDetails.findById(req.params.st);

        if(!fir){
            return res.status(404).json({msg:'FIR Not found'});
        }
        res.json(fir);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

router.post('/:id',auth,async function (req,res) {
     const {acceptance,type_of_crime,signature}=req.body;
    try {
       let fir= await FIRDetails.findById(req.params.id);
       const  update={
        "$set":{
            type_of_crime:type_of_crime,
            acceptance:acceptance,
            signature:signature
        }
       };
        if(fir){
            //Update
            // console.log(fir);
           fir=await FIRDetails.findOneAndUpdate({_id:req.params.id},
               update,
               {new:true});
           console.log(fir);
              await fir.save();
        }

        // fir=new FIRDetails(acceptance);



        res.json(fir);
    }catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

});


module.exports=router;
