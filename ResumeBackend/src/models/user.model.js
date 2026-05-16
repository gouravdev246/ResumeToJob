import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name : { type : String , required : true } ,
    email : {type : String , required : true} ,
    password : {type : String , required : true}  ,
    acctype : { type : String , enum : ["normal" , "pro" , "pro-max"] , default : "normal"}
})

export const User = mongoose.model('User', UserSchema);