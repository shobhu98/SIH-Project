const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectID,
    ref: "users",
    default:"5f2302000f60b55ed89e23c9"
  },
  station:{
    type:String,
  },
  notes: {
    type: String,
  },
  user_status: {
    type: String,
  },
  name: {
    type: String,
    // required: true,
    default:"Shobhit"
  },
  fathersName: {
    type: String,
    required: false,
  },
  DOB: {
    type: Date,
    required: false,
  },
  mobile: {
    type: Number,
    // required: true,
    default:1234567891
  },
  aadhar: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  country: {
    type: String,
    default:"India"
  },
  passport: {
    type: String,
  },
  district: {
    type: String,
  },
  incident: {
    type: String,
    // required: true,
  },
  FIRNUM: {
    type: String,
  },
  UIN: {
    type: String,
    required: true,
    default:"103245"
  },
  addrOfCrime: {
    type: String,
  },
  delay: {
    type: String,
  },
  suspects: {
    type: String,
  },
  acceptance: {
    type: Number,
  },
  type_of_crime: {
    type: String,
  },
  signature: {
    type: Object,
  },
  spam: {
    type: Number,
  },
  officer: {
      type: String
  },

  case_Details: [
    {
      name: "String",
      img: {
        type: Object
      },
    },
  ],
  more_info: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Post = mongoose.model("fir_details", PostSchema);
