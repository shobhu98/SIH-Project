
// Login file for the administrator(police)

const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const Admin=require('../../models/Admin');
const bcrypt=require('bcryptjs');
const {check,validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');
const config=require('config');




//@route POST api/admin_auth
//@desc  Authenticate Administrator
// @access Public
router.post('/',[
    // Checking details entered by the user
    check('email',"Please include a valid email").isEmail(),
    check('password','Password required').exists(),
    check('UIN',"UIN required").exists(),
    check('stationName','station Name Required').exists()
],async function (req,res) {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password,stationName,UIN}=req.body;


    try {
        //See if User exists
        let admin=await Admin.findOne({email});
        if(admin){
            res.status(400).json({errors:[{msg:'User already exist'}]});
        }


        admin=new Admin({
            password,
           UIN,
            stationName,
            email,

        });


        const salt=await bcrypt.genSalt(10);

       admin.password=await bcrypt.hash(password,salt);

        await admin.save();


        // session id creation for admin
        const payload={
            user:{
                id:admin.id
            }
        };

        // encrypting Admin ID using JWT
        jwt.sign(payload,
            config.get('jwtSecret'),
            {expiresIn:360000},
            function (err,token) {
                if(err){
                    throw err;
                }
                res.json({token});

            });


    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }



});








module.exports=router;
