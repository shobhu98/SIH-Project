const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const PostSchema=new Schema({

    name:{
        type: String,

    },

    number:{
        type:String,


    },

    index:{
        type:String,
    }
});
module.exports=Post=mongoose.model('volunteers',PostSchema);
