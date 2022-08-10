import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
import path from 'path';

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use('/api/products',productRouter);
app.use('/api/users',userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);


app.get('/api/config/paypal', (req,res) => res.send(process.env.PAYPAL_CLIENT_ID));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')))
    app.get('*',(req,res) => {
         res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server started in ${process.env.NODE_ENV} on port  ${PORT}`)
})


