import axios from 'axios'
import React, { useEffect } from 'react'

export default function Allorders() {

 async function getAllOrders(){
await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/6407cf6f515bdcf347c09f17`)
.then((res)=>console.log(res.data.data))
.catch((err)=>console.log(err))
  }
useEffect(()=>{
  getAllOrders()
},[])


  return (
    <div>
      allorders
    </div>
  )
}
