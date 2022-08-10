import express from "express";
import Order from "../Models/orderModel.js";
import asyncHandler from 'express-async-handler';
import jwtTokenAuthorizationMiddleWare, { adminMiddleware } from "../middlewares/authorizationMiddleware.js"; 

const router = express.Router();

router.route('/').post(jwtTokenAuthorizationMiddleWare, asyncHandler(async (req,res) => {
    const {isPaid, isDelivered, orderItems, shippingPrice, shippingAddress, itemsPrice, totalPrice, taxPrice, paymentMethod} = req.body;
    if(orderItems.length !== 0){
        const order = new Order({
            user: req.user.id,
            orderItems,
            shippingPrice,
            shippingAddress, 
            itemsPrice, 
            taxPrice, 
            paymentMethod,
            isDelivered,
            isPaid,
            totalPrice
        })
    
        const createdOrder = await order.save();
        res.status(201).send(createdOrder);
    }
    else{
        return res.status(401).send('bad request order items empty')
    }
 
}))

router.route('/getmyorders').get(jwtTokenAuthorizationMiddleWare, asyncHandler(async (req, res) => {
    const orders = await Order.find({user: req?.user?.id});
    res.send(orders);
}))

router.route('/:id').get(jwtTokenAuthorizationMiddleWare, asyncHandler(async (req, res) => {
    console.log("id is ", req?.params?.id);
    const order = await Order.findById(req?.params?.id).populate('user', 'name email');
    console.log("order data is by id", order)
    if(order){
        res.send(order);
    }
    else{
        res.status(404).send('order does not exits');
    }
}))

router.route('/:id/pay').put(jwtTokenAuthorizationMiddleWare, asyncHandler(async (req, res) => {
    const order = await Order.findById(req?.params?.id);
    console.log("order data is in paymet successfull", order)
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,

        }

        const createdOrder = await order.save();
        res.send(createdOrder);
    }
    else{
        res.status(404).send('order does not exits');
    }
}))

router.route('/:id/deliver').put(jwtTokenAuthorizationMiddleWare, asyncHandler(async (req, res) => {
    const order = await Order.findById(req?.params?.id);
    console.log("order deliver  backend", order)
    if(order){
        order.isDelivered= true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.send(updatedOrder);
    }
    else{
        res.status(404).send('order does not exits');
    }
}))

router.route('/').get(jwtTokenAuthorizationMiddleWare,adminMiddleware, asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', '_id name');
    res.send(orders);
}))



export default router;