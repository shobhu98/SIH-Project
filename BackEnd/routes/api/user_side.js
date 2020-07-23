// const express=require('express');
// const router=express.Router();
// const {check,validationResult}=require('express-validator');
// const auth=require('../../middleware/auth');
// const  FIRDetails=require('../../models/FIRDetails');
//
//
//
//
// // @route  GET api/user_side
// // @desc   GET all FIR
// // @access  Private
//
// router.get('/',auth,async function (req,res) {
//     try {
//         const fir= await  FIRDetails.find({UIN:req.body.uin}).sort({date:-1});
//         res.json(fir);
//     }catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
//
// });
//
// // @route  GET api/admin_side/:id
// // @desc   GET post by id
// // @access  Private
//
// router.get('/:id',auth,async function (req,res) {
//     try {
//         const posts= await Post.findById(req.params.id);
//         if(!posts){
//             return res.status(404).json({msg:'Post Not found'});
//         }
//         res.json(posts);
//     }catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
//
// });
