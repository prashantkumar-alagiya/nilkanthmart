import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchTopRatedProducts } from '../reducers/topRatedProductsSlice';
import Loader from './Loader';
import Message from './Message';

const ProductsCarousel = () => {
    const dispatch = useDispatch();
    const {error, isLoading, products = []} = useSelector((state) => state.topRatedProducts);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handleBulletClick = (e) => {
        console.log(products[e.target.id]?._id);
        if(products && products[e.target.id]?._id ){
            navigate(`/products/${products[e.target.id]?._id}`)
        }
    }

    useEffect(() => {
        dispatch(fetchTopRatedProducts());
    }, [dispatch])

    useEffect(() => {
        let id = '';
        if(products?.length === currentIndex){
            setCurrentIndex(0);

        }
        else{
            id = setTimeout(() => {
                setCurrentIndex((previousIndex) => previousIndex + 1);
            },2000)
        }

        return () => {
            clearTimeout(id);
        }
    }, [currentIndex, products.length])

    return (
        <>
        {isLoading ? <Loader />  : error ? <Message variant = 'danger'>{error}</Message> : (
            products && <div style = {{height: '400px', display :'flex',position : 'relative', backgroundSize : 'contain',backgroundImage : `url(${products[currentIndex]?.image})`}}>
                <div style = {{position: 'absolute', top : '50%', left: '50%', transform: 'translate(-50%,-50%)'}}>
                    <h2>{products[currentIndex]?.name}</h2>
                    <h2>${products[currentIndex]?.price}</h2>
                </div>
                <div onClick = {handleBulletClick} style = {{zIndex: '99', display: 'flex', gap : '5px', height : '50px', position : 'absolute', top : '75%', left: '50%', transform: 'translate(-50%,0)'}}>
                    {[...Array(products?.length).keys()].map((item) => {
                        return <div id = {item} key = {item} style = {{height:'30px', width: '30px', borderRadius:'15px', backgroundColor: `${item === currentIndex ? 'white' : '#F0F0F0'}`, border: '1px solid black'}}>
                            
                            </div>
                    })}
                
                </div>
            </div>
            )}
        </>
    )
  
}

export default ProductsCarousel;