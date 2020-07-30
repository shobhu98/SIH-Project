
// This file is for user registration (complainant registration)
// issue

const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const {check,validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');
const config=require('config');
const twilio_credentials=require('../../config/twilio');
const twilio=require('twilio')(twilio_credentials.accountSID,twilio_credentials.authToken);
const User=require('../../models/Users');

router.get('/', async function (req,res){
    res.send("Hello World");
});

router.post('/',[
    //here we check whether details entered by the complainant are correct or not
    check('number',"Please include a valid number").isLength({min:10}),
    check('password',"Please enter a valid password").isLength({min:6})
],async function (req,res) {

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return  res.status(400).json({errors:errors.array()})
    }
    console.log(req.url);
    // details destructured from the body
    const {number,password}=req.body;
    try{
        let user=await User.findOne({number:number});
        if(user){
            res.status(400).json({errors:[{msg:'User already exist'}]});

        }
        console.log("here");
        twilio.verify.services(twilio_credentials.servideID).verifications.create({
                to:"+91"+number,
                channel:"sms"
         }

        ).then(data=>{

         console.log("hello");
         res.json({data,number,password});

        });

    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");

    }

});

router.post('/save',[
    check('number','number should exist and length should be 10').isLength({min:10}),
    check('name','name should exist ').exists(),
    check('code','enter the 6 digit code ').isLength({min:6}),
    check('password','please enter minimum 6 digit password ').isLength({min:6}),
],async function (req,res) {

 const {number,password,code,name}=req.body;
//  const number="8920862975";
//  const name="St";
//  const password="123456";


    try {
        twilio.verify.services(twilio_credentials.servideID).verificationChecks.create({
                to: "+91" + number,
                code: code
            }
        ).then(data => {
           if(data.data.valid==='false'){
               res.json.status(500)({msg:"Incorrect OTP"})
           }
        });
    let    user=new User({
            // name,number,password
            number,password,name
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
                if (err) {
                    throw err;
                }
                res.json({token});

            })
    }catch (err) {
        console.log(err);

    }
});



router.get('/save/:number/:name/:password',async function (req,res) {
    // Registering the new user using the User Model-> models/User.js
    const name=req.params.name;
    const number=req.params.number;
    const password=req.params.password;
    try{
        user=new User({
            name,number,password
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