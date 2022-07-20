import {Spinner} from 'react-bootstrap'
import React from 'react'

function Loader() {
  return (
    <Spinner role = 'status' animation='border' style = {{ width : '100px', height :'100px', margin: 'auto', display: 'block'}}>
        <span className = 'sr-only'>Loading...</span>
    </Spinner>
  )
}

export default Loader