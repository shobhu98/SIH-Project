const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const User=require('../../models/Users');
const bcrypt=require('bcryptjs');
const {check,validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');
const config=require('config');


router.get('/',auth,async function (req,res) {
    try {
        const user= await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});


//@route POST api/users
//@desc  Authenticate user
// @access Public
router.post('/',[
    check('email',"Please include a valid email").isEmail(),
    check('password','Password required').exists(),
],async function (req,res) {
    // console.log(req.body);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}=req.body;


    try {
        //See if User exists
        let user=await User.findOne({email});
        if(!user){
            res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
        }

        const isMatch=await bcrypt.compare(password,user.password);


        if(!isMatch){
            return res
                .status(400)
                .json({errors:[{msg:'Invalid Password,Passwords Do Not Match'}]});
        }

        const payload={
            user:{
                id:user.id
            }
        };


        jwt.sign(payload,
            config.get('jwtSecret'),
            {expiresIn:360000},
            function (err,token) {
                if(err){
                    throw err;
                }
                res.json({token});

            });





        // res.send('User registered');

    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }



});








module.exports=router;
