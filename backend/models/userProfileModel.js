const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userProfileSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    age: {
      type: Number,
      default: 0,
    },
    gender: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },    
    userId: {
      type: String,
      required: true,
    },
  },
);


module.exports = mongoose.model('UserProfile', userProfileSchema)