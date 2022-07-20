import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("connection builded successfully ",conn.connection.host);
    }
    catch(e){
        process.exit(1);
    }
}

export default connectDB;