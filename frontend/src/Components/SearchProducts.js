import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchProducts = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(query){
            console.log("query is ",query);
            navigate(`/search/${query}`);
        }
        else{
            navigate('/');
        }
    }
  return (
    <Form style = {{display: 'flex'}} onSubmit = {handleSubmit}>
        <Form.Control type = "text" value = {query} onChange={(e) => setQuery(e.target.value)} name = 'query' placeholder='search product..'
            className='mr-sm-2 ml-sm-5'
        >

        </Form.Control>
        <Button type = 'submit' variant = 'outline-success' className = 'p-2'>Search</Button>
    </Form>
  )
}

export default SearchProducts