import mongoose from "mongoose";
import validator from "validator";
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:[true,"Please enter your Name"]
},
email:{
    type:String,
    required:[true,"Please enter your Email"],
    unique:true,
    validate : validator.isEmail,

},
password:{
    type:String,
    required:[true,"Please enter your Password"],
    minLength:[6,'Password must be at least 6 characters'],
    select:false
},
role:{
    type:String,
    enum:["admin","user"],
    default:'user',
},
createdAt:{
    type:Date,
    default:Date.now
},
ResetPasswordToken:String,
ResetPasswordExpire:String,

});
/// password hash here
userSchema.pre('save',async function(next){
    if(!this.isModified("password")) return next()
    this.password =   await  bcrypt.hash(this.password,10);
    next()
});

// compare password
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}


userSchema.methods.getJWTToken = async function(){
  return await JWT.sign({_id:this._id},process.env.JWT_SECRET,{
    expiresIn:"15d",
  });

};



export const User  = mongoose.model('users',userSchema)