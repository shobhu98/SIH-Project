
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
    check('uin','UIN is required').exists(),
],async function (req,res) {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.log(req.body)
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}=req.body;


    try {
        //See if User exists
        let admin=await Admin.findOne({email});
        if(!admin){
            res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
        }

        const isMatch=await bcrypt.compare(password,admin.password);


        if(!isMatch){
            return res
                .status(400)
                .json({errors:[{msg:'Invalid Password,Passwords Do Not Match'}]});
        }
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
