import  Jwt  from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { User } from "../models/userModel.js";

export const isAuthenticated = catchAsyncError(async(req,res,next)=>{
    const {token} = await req.cookies;
    // console.log(token)
    if(!token){
        return next(new ErrorHandler("Please login first",401));

    };
  const decodedData =   Jwt.verify(token,process.env.JWT_SECRET);
  req.user = await User.findById(decodedData._id);
  next()
})