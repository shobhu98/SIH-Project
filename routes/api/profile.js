const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const Profile=require('../../models/Profile');
const {check,validationResult}=require('express-validator');

// @route GET api/profile/me
// @desc   Get profile by user ID
// @access Public
router.get('/me',auth,async function (req,res) {

    try {
        const profile=await Profile.findOne({user:req.user.id}).populate();
        if(!profile){
            return res.status(400).json({msg:'There is no profile for this user'});
        }
        res.json(profile);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route POST api/profile/
// @desc  Update or Create current users profile
// @access Private

router.post('/',[
    auth,
    check('name','Name is required')
        .not()
        .isEmpty(),
    check('mobile','Mobile is required')
        .not()
        .isEmpty()
],async function (req,res) {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name,fathersName,DOB,aadhar,address,mobile,email,country,passport
    }=req.body;

    //Build profile object
    const profileFields={};
    profileFields.user=req.user.id;
    profileFields.name=name;
    profileFields.mobile=mobile;
    profileFields.DOB=DOB;
    // profileFields.facilitatorsNumber=facilitatorsNumber;
    // profileFields.facilitatorsEmail=facilitatorsEmail;
    profileFields.fathersName=fathersName;
    profileFields.aadhar=aadhar;
    profileFields.address=address;
    profileFields.email=email;
    profileFields.country=country;
    profileFields.passport=passport;


    try {
        let profile=Profile.findOne({user:req.user.id});
        if(profile){
            //Update
            profile=await Profile.findOneAndUpdate({user:req.user.id},
                {$set:profileFields},
                {new:true})
        }
        // Create
        profile=new Profile(profileFields);
        await profile.save();
        res.json(profile);
    }catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

});

module.exports=router;
