import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRouter from './routes/productRoutes.js'

dotenv.config();
connectDB();
const app = express();

app.get('/', (req,res) => {
    res.send("this is home page api , yayy!!!!")
})


app.use('/api/products',productRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server started in ${process.env.NODE_ENV} on port  ${PORT}`)
})


