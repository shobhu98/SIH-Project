
// This file is for user authentication (complainant authentication)


const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const User=require('../../models/Users');
const bcrypt=require('bcryptjs');
const {check,validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');
const config=require('config');

//@route GET api/auth
//@desc  Authenticate user
// @access Public
// authenticating a user  immediately  after registration on the portal

// for auth check middleware/auth
router.get('/',auth,async function (req,res) {
    try {
        const user= await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});


//@route POST api/auth
//@desc  Authenticate user
// authenticating a user when he only login's and does not register
// @access Public
router.post('/',[
    // checking whether
    check('number',"Please include a valid number").isLength({min:10}),
    check('password','Password required').exists(),
],async function (req,res) {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {number,password}=req.body;


    try {
        //See if User exists
        let user=await User.findOne({number:number});
        if(!user){
            res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
        }
        // Checking whether password's match or not
        const isMatch=await bcrypt.compare(password,user.password);


        if(!isMatch){
            return res
                .status(400)
                .json({errors:[{msg:'Invalid Password,Passwords Do Not Match'}]});
        }
         //creating a session number for the present user who is logging-In
        const payload={
            user:{
                id:user.id
            }
        };

        // encrypting the session number using JWT
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
