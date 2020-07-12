const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const {check,validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');
const config=require('config');

const User=require('../../models/Users');



router.post('/',[
    check('name',"Name is required").not().isEmpty(),
    check('email',"Please include a valid email").isEmail(),
    check('password',"Please enter a valid password").isLength({min:6})
],async function (req,res) {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return  res.status(400).json({errors:errors.array()})
    }
    const {email,name,password}=req.body;

    try{
        let user=await User.findOne({email});
        if(user){
            res.status(400).json({errors:[{msg:'User alreadyh exist'}]});

        }
        user=new User({
            name,email,password
        });

        const  salt=await  bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);
        await  user.save();

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
    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");

    }

});

module.exports=router;
