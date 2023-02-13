export const sendToken = async(res,user,message,statusCode) =>{
    
    const token = await user.getJWTToken();
    const option ={
        expires:new Date(Date.now()+ 15 * 24 * 60 * 60 * 1000),
        httpOnly:true,
        // secure:true,
        sameSite:"none"
    }

    res.status(statusCode).cookie("token",token,option).json({
        message,
        user,
        token
    })
}