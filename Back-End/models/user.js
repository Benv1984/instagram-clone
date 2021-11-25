const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:true
    },
    email:{
        type:String, 
        required:true
    },
    password:{
        type:String, 
        required:true
    },
    resetToken:String,
    expireToken:Date,
    pic:{
    type:String, 
    default:"https://res.cloudinary.com/dpa7kenji/image/upload/v1637155336/user-profile-icon-free-vector_ksarqu.jpg"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})

module.exports = mongoose.model("User", userSchema)