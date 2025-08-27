import React from 'react'
import {  useNavigate, useSearchParams } from 'react-router-dom'
import "./Verifyorder.css"
import axios from 'axios'

const Verifyorder = () => {
    const[searchparam,setSearchhparam]=useSearchParams()
    const success = searchparam.get("success")
    const orderId = searchparam.get("orderId")
    const navigate=useNavigate()

    const VerifyOrder =async(req,res)=>{
      const response=await axios.post(`http://localhost:4000/api/order/place`,{success,orderId})
      if(response.data.success){
        navigate('/myorder')
      } else{
        navigate('/')
      }
    }

    
  return (
    <div className='verify'>
      <div className='spinner'></div>
    </div>
  )
}

export default Verifyorder
