import express from "express";
import Product from "../Models/productModel.js";
import asyncHandler from 'express-async-handler';
import jwtTokenAuthorizationMiddleWare, { adminMiddleware } from "../middlewares/authorizationMiddleware.js";

const router = express.Router();

router.get('/', asyncHandler(async (req,res) => {
    const keyword = req.query.keyword;
    const pageSize  = 5;
    const pageNumber = req.query.pageNumber ? Number(req.query.pageNumber) : 1
    const config  = keyword ? {
        name : {
            $regex: keyword,
            $options: 'i'
        }
    }: {};
    const totalProducts = await Product.countDocuments(config);
    const totalPages = Math.ceil(totalProducts/pageSize)
    const products = await Product.find(config).limit(pageSize).skip(pageSize * (pageNumber - 1));
    res.json({products, page : pageNumber,pages : totalPages});
}))

router.get('/top', asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({rating : -1}).limit(3);
    if(products){
        res.json( products);
    }
    else{
        res.status(404).json({msg: "product not found"})
    }  
}))

router.get('/:id', asyncHandler(async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(product){
            return res.json( product);
        }
        else{
            return res.status(404).json({msg: "product not found"});
        }  
    }
    catch(e){
        res.status(404).json({msg: 'product not found'});
    }
}))

router.route('/:id').delete(jwtTokenAuthorizationMiddleWare,adminMiddleware, asyncHandler(async (req,res) => {
    const id = req?.params?.id;
    const product = await Product.findById(id);
    if(product){
        await product.remove();
        res.send({message : 'product removed successfully'});
    }
    else{
        res.status(404).send('product not found');
    }
}))

router.route('/').post(jwtTokenAuthorizationMiddleWare,adminMiddleware, asyncHandler(async (req,res) => {
    const {name, price, description, brand, category, image, countInStock, user} = req.body;

    const product = new Product({
        name, price, description, brand, category, user, image, countInStock
    })

    const createdProduct = await product.save();
    res.status(201).send(createdProduct);
}))

router.route('/:id').put(jwtTokenAuthorizationMiddleWare,adminMiddleware, asyncHandler(async (req,res) => {
    const id = req?.params?.id;
    const product = await Product.findById(id);
    console.log("product update ", product);
    const {name, price, description, brand, category, image, countInStock} = req.body;

    if(product){
        product.name = name;
        product.price = price;
        product.description = description;
        product.brand = brand;
        product.category = category;
        product.image = image;
        product.countInStock= countInStock;
        const updatedProduct = await product.save();
        res.send(updatedProduct);
    }
    else{
        res.status(404).send('product not found');
    }
}))


router.route('/:id/review').post(jwtTokenAuthorizationMiddleWare,adminMiddleware, asyncHandler(async (req,res) => {
    const id = req?.params?.id;
    const product = await Product.findById(id);
    const {rating, comment} = req.body;

    if(product){
        const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user.id.toString());
        if(alreadyReviewed){
            return res.status(400).send({status: 400, msg: 'alreday reviewed'});
        } 
        const review = {
            name: req.user.name,
            user: req.user.id,
            comment,
            review: Number(rating)
        } 
        
        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating = product?.reviews?.reduce((acc, review) => acc + Number(review.review), 0)/product.reviews.length;

        const updatedProduct = await product.save();
        res.status(201).send(updatedProduct);
    }
    else{
        res.status(404).send({status: 404,msg : 'product not found'});
    }
}))




export default router;
