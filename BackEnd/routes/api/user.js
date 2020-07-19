
// This file is for user registration (complainant registration)


const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const {check,validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');
const config=require('config');

const User=require('../../models/Users');



router.post('/',[
    //here we check whether details entered by the complainant are correct or not
    check('name',"Name is required").not().isEmpty(),
    check('email',"Please include a valid email").isEmail(),
    check('password',"Please enter a valid password").isLength({min:6})
],async function (req,res) {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return  res.status(400).json({errors:errors.array()})
    }
    // details destructured from the body
    const {email,name,password}=req.body;

    try{
        // finding user based on email entered by the complainant
        let user=await User.findOne({email});
        if(user){
            res.status(400).json({errors:[{msg:'User already exist'}]});

        }
        // Registering the new user using the User Model-> models/User.js
        user=new User({
            name,email,password
        });
         // encrypting the password using bcrypt(SHA-256 Algorithm)
        const  salt=await  bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);

        // Saving the user in mongoDB database
        await  user.save();
        // creating a code for unique session
        const payload={
            user:{
                id:user.id
            }
        };
        // encrypting the above code using JWT authentication
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
