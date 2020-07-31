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
    check('email','Email is required').isEmail(),
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
            incident:req.body.incident,
            UIN:req.body.UIN,
            user:user.id,
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
        const posts= await FIRDetails.find({}).sort({date:-1});
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
        const posts= await Post.findById(req.params.id);
        if(!posts){
            return res.status(404).json({msg:'Post Not found'});
        }
        res.json(posts);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});








module.exports=router;
