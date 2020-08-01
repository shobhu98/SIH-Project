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
    district:{
        type:String
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
    addrOfCrime:{
        type:String
    },
    delay:{
        type:String
    },
    suspects:{
        type:String
    },
    acceptance:{
        type:Number,
    },
    type_of_crime:{
        type:String,
    },
    signature:{
        type:Object,
    },
    spam:{
        type:Number,
    },

    case_Details:[
        {
            name:'String',
            img:{
                data:Buffer,
                contentType:String
            }

        }
    ],


    date:{
        type:Date,
        default: Date.now
    }
});
module.exports=Post=mongoose.model('fir_details',PostSchema);
