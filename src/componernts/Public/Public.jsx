import React from 'react'
import { Link } from 'react-router-dom'
import './public.css'
const Public = () => {
  return (
    <div>
        <h1>Welcom to the Page</h1>
        <Link to='/login'>Please Login Or SignUp</Link>
    </div>
  )
}

export default Public