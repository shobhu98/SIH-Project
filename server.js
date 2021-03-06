//Main file. Everything is controlled from here

const express = require("express");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 7000;
const app = express();
let cors=require('cors');
const  connectDB=require('./config/db');
var bodyParser = require('body-parser');
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Mongodb connection is called from config/db.js
 connectDB();

 app.use(bodyParser.json({limit: '10000kb'}));

//Various apis are called here from routes/api
app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/admin_auth", require("./routes/api/admin_auth"));
app.use("/api/admin_register", require("./routes/api/admin_register"));
app.use("/api/admin_side", require("./routes/api/admin_side"));
app.use("/api/dialogflow", require("./routes/api/dialogflow"));
app.use("/api/pdfGenerate", require("./routes/api/pdfGenerator"));
app.use("/api/lodgeFIR", require("./routes/api/lodgeFIR"));
app.use("/api/upload_files",require('./routes/api/upload_files'));
app.use("/api/profile",require('./routes/api/profile'));
app.use("/api/volunteers",require('./routes/api/volunteers'));


//running on PORT code
app.listen(PORT, function () {
  console.log("running on port " + PORT);
});
