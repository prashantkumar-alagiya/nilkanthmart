import dotenv from 'dotenv';
import User from "./Models/userModel.js";
import Product from "./Models/productModel.js";
import Order from "./Models/orderModel.js";
import connectDB from "./config/db.js";
import users from "./data/Users.js";
import products from "./data/products.js";

dotenv.config();
connectDB();

const importData = async () => {
    try{
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        const insertedUsers = await User.insertMany(users);
        const user = insertedUsers[0];
        const updatedProducts = products.map((product) => {
            return {
                ...product,
                user: user
            }
        })

        await Product.insertMany(updatedProducts);

        console.log("data imported".green.inverse);
    }
    catch(error){
        console.log(`${error.message}`.red.inverse)
    }
}

const destroyData = async () => {
    try{
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        console.log("data destroyed".green.inverse);
    }
    catch(error){
        console.log(`${error.message}`.red.inverse)
    }
}

if(process.argv[2] === '-d'){
    destroyData();
}
else{
    importData();
}

