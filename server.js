const express = require('express');
const cookieParser = require('cookie-parser');
const PORT=process.env.PORT||6000;
const app = express();
const  connectDB=require('./config/db');

// Connecting to mongoDB
 connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api/user',require('./routes/api/user'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/dialogflow',require('./routes/api/dialogflow'));

app.listen(PORT,function () {
  console.log("running on port "+PORT);

});
