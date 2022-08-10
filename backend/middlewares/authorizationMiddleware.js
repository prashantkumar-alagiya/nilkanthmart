import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../Models/userModel.js';

const jwtTokenAuthorizationMiddleWare = asyncHandler(async(req,res,next) => {
    const token = req.headers?.authorization;
    console.log("token is ", token);
    try{
    if(token && token.startsWith('Bearer')){
        const jwtToken  = token?.split(' ')[1];
        console.log("final token ", jwtToken);
        const {id} = jwt.verify(jwtToken,process.env.JWT_TOKEN_SECRET);
        console.log("user id ",id);
        const user  = await User.findById(id).select('-password');
        console.log("user is ",user)
        
        if(user){
            req.user = user;
            next();
        }
        else{
            console.log("user not found");
            res.status(404);
            throw new Error("user not found")
        }
    }
    else{
        console.log("invalid token ")
        res.status(401);
        throw new Error('unauthorized user');
    }
    }
    catch(e){
        console.log("catch error");
        throw new Error(e.message);
    }
})

export const adminMiddleware = asyncHandler(async (req,res,next) => {
    if(req?.user?.isAdmin){
        next();
    }
    else{
        res.status(401).send('not an authorized user')
    }
})
export default jwtTokenAuthorizationMiddleWare;