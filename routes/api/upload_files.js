var cors = require('cors');
let fs=require('fs');
let path=require('path');
require('dotenv/config');
let multer=require('multer');
let express=require('express');
let router=express.Router();
const FIR=require('../../models/FIRDetails');
let auth=require('../../middleware/auth');
const {check,validationResult}=require('express-validator');
const fileUpload=require('express-fileupload');
router.use(fileUpload());



let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });


// Retriving the image
router.get('/',[auth,
check('uin',"UIN is required").not().isEmpty()
    ]
    , async (req, res) => {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
    const {uin}=req.body;

        try {
            let firdetails=await FIR.find({UIN:uin});
            res.json(firdetails[0].case_Details);
        }catch (err) {
            console.log(err);

        }








});

// Uploading the image
router.post('/',[auth,

],async (req, res, next) => {
 console.log(req.body);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {firnum}=req.body;

    try {
        let obj = {

            name: req.body.name,
            img: {
                // data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.body.img)),
                data:req.files.file,
                contentType: 'image/jpg',
            }
        };
        let firdetails=await FIR.findOne({FIRNUM:firnum});

        firdetails.case_Details.unshift(obj);
        await firdetails.save();
        res.json(firdetails);
        res.json(firdetails);
    }catch (err) {
        console.log(err);

    }








    // imgModel.create(obj, (err, item) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         // item.save();
    //         res.redirect('/');
    //     }
    // });
});


module.exports=router;


