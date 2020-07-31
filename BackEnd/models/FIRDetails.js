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
    // email:{
    //     type:String,
    //     required:true
    // },
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
    incident:{
        type:String,
        required:true

    },
    FIRNUM:{
      type:String,

    },

    UIN:{
        type:String,
        required:true,
    },

    acceptance:{
        type:Number,
        default: 0,
    },
    type_of_crime:{
        type:String,
    },


    date:{
        type:Date,
        default: Date.now
    }
});
module.exports=Post=mongoose.model('fir_details',PostSchema);
