var cors = require('cors');
let fs=require('fs');
let path=require('path');
require('dotenv/config');
let multer=require('multer');



// Mongodb connection is called from config/db.js
connectDB();

// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
//
// var upload = multer({ storage: storage });
//
//
// // Retriving the image
// app.get('/', (req, res) => {
//     imgModel.find({}, (err, items) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.send(items);
//         }
//     });
// });
//
// // Uploading the image
// app.post('/', (req, res, next) => {
//  console.log(req.body);
//     var obj = {
//         name: req.body.name,
//         desc: req.body.desc,
//         img: {
//             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.body.img)),
//             contentType: 'image/jpg'
//         }
//     };
//     imgModel.create(obj, (err, item) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             // item.save();
//             res.redirect('/');
//         }
//     });
// });





