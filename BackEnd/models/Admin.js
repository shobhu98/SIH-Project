const  mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({

    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    UIN:{
        type:Number,
        required:true,
    },
    stationName:{
        type:String,
        required:true,
    },

    date:{
        type:Date,
        default:Date.now
    },

});
module.exports=User=mongoose.model('admin',UserSchema);
