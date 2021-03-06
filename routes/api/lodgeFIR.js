const express=require('express');
const router=express.Router();
const {check,validationResult}=require('express-validator');
const auth=require('../../middleware/auth');
const FIRDetails=require('../../models/FIRDetails');
const User=require('../../models/Users');



// @route  POST api/lodgeFIR
// @desc   Create a FIR
// @access Private
router.post('/',[auth,
    check('name','Name is required').not().isEmpty(),
    // check('email','Email is required').isEmail(),
    check('mobile','Mobile is required').isLength({min:10}),
    check('incident','Incident Details are required').not().isEmpty(),


],async function (req,res) {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    } try {
        const user=await User.findById(req.user.id).select('-password');

        const newPost=new FIRDetails({
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mobile,
            fathersName: req.body.fathersName,
            DOB:req.body.dob,
            aadhar:req.body.aadhar,
            address:req.body.address,
            country:req.body.country,
            passport:req.body.passport,
            district:req.body.incident,
            addrOfCrime:req.body.addrOfCrime,
            incident:req.body.incident,
            // UIN:req.body.UIN,
            UIN:"103245",
            user:user.id,
            delay:req.body.delay,
            suspects:req.body.suspects,
            signature_user:req.body.signature_user,
            date_of_incident:req.body.date_of_incident,
            acceptance:req.body.acceptance
        });
        const post=await newPost.save();
        res.json(post);
    }catch (err) {
        console.log(err.message);
        res.status(500).send('Sever Error');
    }


});
// @route  GET api/lodgeFIR
// @desc   GET all the FIR lodged by the complainant
// @access  Private

router.get('/',auth,async function (req,res) {
    try {
        const posts= await FIRDetails.find({user:req.user.id}).sort({date:-1});
        res.json(posts);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route  GET api/lodgeFIR/:id
// @desc   GET FIR by id. When complainant will click on the particular FIR He will get all the details
// @access  Private

router.get('/:id',auth,async function (req,res) {
    try {
        const fir= await FIRDetails.findById(req.params.id);
        if(!fir){
            return res.status(404).json({msg:'Post Not found'});
        }

        else{

            if(fir.acceptance===1){
                let msg="your fir has been accepted click to download the pdf";
                res.json({fir,msg});
            }
            else if(fir.acceptance===2){
                // res.json();
                let msg="information incomplete more info required";
                res.json({fir,msg});
            }
            else{
                let msg="waiting for the SHO response ";
                res.json({fir,msg});
                // res.json();
            }
        }

    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});








module.exports=router;
