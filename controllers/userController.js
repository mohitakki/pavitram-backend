import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";



export const register = catchAsyncError(async(req,res,next)=>{
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        return next(new ErrorHandler("Please enter all field",400))
    }
    
    let user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler("User already exist ",409));

    };
    
    user = await User.create({
        name,email,password,
    });
    sendToken(res,user,"Register successfully",201)
});
export const login  = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please enter all field",400))
    };
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("User Doesn't Exit",401))
    };
    const isMatched = await user.comparePassword(password);
    if(!isMatched){
        return next(new ErrorHandler("Incorrect Email or password",401))
    };
    sendToken(res,user,`Welcomeback - ${user.name}`,200)
});

export  const logout = catchAsyncError(
    async(req,res,next)=>{
        res.status(200).cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true,
            // secure:true,
            sameSite:"none"
        }).json({
            success:true,
            message:"Logged Out Successfully"
        })
    }
);