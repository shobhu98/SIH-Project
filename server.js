
//Main file. Everything is controlled from here


const express = require('express');
const cookieParser = require('cookie-parser');
const PORT=process.env.PORT||7000;
const app = express();
const  connectDB=require('./config/db');
var cors = require('cors');
let fs=require('fs');
let path=require('path');
require('dotenv/config');
let multer=require('multer');
let imgModel=require('./models/Case');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
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






// Various apis are called here from routes/api
app.use('/api/user',require('./routes/api/user'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/admin_auth',require('./routes/api/admin_auth'));
app.use('/api/admin_register',require('./routes/api/admin_register'));
app.use('/api/admin_side',require('./routes/api/admin_side'));
app.use('/api/dialogflow',require('./routes/api/dialogflow'));
app.use('/api/pdfGenerate',require('./routes/api/pdfGenerator'));
app.use('/api/lodgeFIR',require('./routes/api/lodgeFIR'));




//running on PORT code
app.listen(PORT,function () {
  console.log("running on port "+PORT);

});
