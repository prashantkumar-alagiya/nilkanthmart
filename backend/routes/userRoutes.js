import express from "express";
import Users from "../Models/userModel.js";
import asyncHandler from 'express-async-handler';
import { generateToken } from "../utils/generateToken.js";
import jwtTokenAuthorizationMiddleWare from "../middlewares/authorizationMiddleware.js"; 
import User from "../Models/userModel.js";
import { adminMiddleware } from "../middlewares/authorizationMiddleware.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post('/login', asyncHandler(async (req,res) => {
   
    const {email,password} = req.body;

    try{
    const user = await Users.findOne({email});
    if(user && await user.matchPassword(password)){
        res.send({
            id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            email
        })
    }
    else{
        return res.status(401).send({msg : 'invalid userId or Password',status : 401});
        
    }
    }
    catch(e){
        return res.status(401).send('user doesnot exist');
    }
}))

router.route('/').post(asyncHandler(async (req,res) => {
    const {email,name,password} = req.body;
    const user = await User.findOne({email});

    if(user){
        res.status(401).send("user already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = await User.create({
        email,
        name,
        password : hashedPassword
    });

    res.send({
        email : createdUser.email,
        name: createdUser.name,
        token: generateToken(createdUser._id)
    })
}))

router.route('/profile').get(jwtTokenAuthorizationMiddleWare,async (req,res) => {
    const user = await User.findById(req.user.id);
    if(user){
        res.send({
            id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            email: user.email
        })
    }
    else{
        res.status(404);
        throw new Error('user not found')
    }
})

router.route('/profile').put(jwtTokenAuthorizationMiddleWare,async (req,res) => {
    const user = await User.findById(req.user.id);
    if(user){
        user.name  = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }
        const updatedUser = await user.save();

        res.send({
            id: updatedUser._id,
            name: updatedUser.name,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
            email: updatedUser.email
        })

    }
    else{
        res.status(404).send("user not found");
        //throw new Error('user not found')
    }
})

router.route('/').get(jwtTokenAuthorizationMiddleWare,adminMiddleware,asyncHandler(async (req,res) => {
    const users = await Users.find({});
    res.json(users);
}))

router.route('/:id').delete(jwtTokenAuthorizationMiddleWare, adminMiddleware, asyncHandler(async (req, res) => {
    const user = await User.findById(req?.params?.id);
    if(user){
        await user.remove();
        res.send({message: 'user deleted'})
    }
    else{
        res.status(404).send('user not found')
    }
}))

router.route('/:id').get(jwtTokenAuthorizationMiddleWare, adminMiddleware, asyncHandler(async (req, res) => {
    const user = await User.findById(req?.params?.id).select('-password');
    if(user){
        res.send(user)
    }
    else{
        res.status(404).send('user not found')
    }
}))

router.route('/:id').put(jwtTokenAuthorizationMiddleWare, adminMiddleware,async (req,res) => {
    const user = await User.findById(req.user.id);
    if(user){
        user.name  = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin;
        const updatedUser = await user.save();

        res.send({
            id: updatedUser._id,
            name: updatedUser.name,
            isAdmin: updatedUser.isAdmin,
            email: updatedUser.email
        })

    }
    else{
        return res.status(404).send("user not found");
       
    }
})

export default router;