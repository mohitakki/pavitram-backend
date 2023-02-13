export const catchAsyncError = (passedfuction)=>(req,res,next)=>{
    Promise.resolve(passedfuction(req,res,next)).catch(next);
};