const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const PostSchema=new Schema({
    user:{
        type:Schema.Types.ObjectID,
        ref:'users',
    },
    name:{
        type: String,
        required:true
    },
    fathersName:{
        type:String,
        required:false,
    },
    DOB:{
        type:Date,
        required:false,

    },
    mobile:{
        type:Number,
        required:true,

    },

//    facilitatorsNumber:{
//         type:Number,

//    },
//     facilitatorsEmail:{
//         type:email,

//     },
    aadhar:{
        type:String
    },
    address:{
        type:String
    },
    email:{
        type:String
    },
    country:{
        type:String
    },
    passport:{
        type:String
    },
    date:{
        type:Date,
        default: Date.now
    }
});
module.exports=Post=mongoose.model('Profile',PostSchema);
