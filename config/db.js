const mongoose=require('mongoose');
const  config=require('config');
db=config.get('mongoURI');

// Code to connect mongoDB Atlas with Backend(Node.js)
const  connectDB=async ()=>{
    try {
        await mongoose.connect(db,{
            useNewUrlParser:true,
            useCreateIndex:true,
            useUnifiedTopology:true
        });
        console.log("MongoDB connected");
    }catch (err) {
        console.error(err.message);
        process.exit(1);

    }
};

module.exports=connectDB;
