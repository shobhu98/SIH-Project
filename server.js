
//Main file. Everything is controlled from here


const express = require('express');
const cookieParser = require('cookie-parser');
const PORT=process.env.PORT||6000;
const app = express();
const  connectDB=require('./config/db');


// Mongodb connection is called from config/db.js
 //connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Various apis are called here from routes/api
app.use('/api/user',require('./routes/api/user'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/dialogflow',require('./routes/api/dialogflow'));
app.use('/api/pdfGenerate',require('./routes/api/pdfGenerator'));
app.use('/api/lodgeFIR',require('./routes/api/lodgeFIR'));


//running on PORT code
app.listen(PORT,function () {
  console.log("running on port "+PORT);

});
