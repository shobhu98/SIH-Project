const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const bcrypt=require('bcryptjs');
const {check,validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');
const config=require('config');
const Volunteer=require('../../models/Volunteers');



//@route POST api/volunteers
//@desc  Authenticate user
// finding volunteers
// @access private
router.get('/',auth,async function (req,res) {

    let index=Math.round(Math.random()*3);
    // console.log(index);


    try {
        //See if User exists
        let volunteer=await Volunteer.findOne({index:index});
        res.json(volunteer);

    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }



});








module.exports=router;
