import React, { useEffect, useState } from 'react'
import style from './orders.module.css'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
export default function Orders() {

  const [orders, setOrders] = useState([])

  async function getAllOrders(id) {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/` + id)
    console.log(data);
    setOrders(data)
  }
  useEffect(() => {
    const { id } = jwtDecode(localStorage.getItem('token'));
    console.log(id);
    getAllOrders(id)
  }, [])

  return (
    <>
      <h1 className='mt-5'>Your Orders :</h1>
      {orders.map((order) => {
        return <div className='row' key={order.id}>
          <div className='order shadow p-4 my-5'>
            <div className='d-flex align-items-center'>
              <h2 className='fw-bolder'>#{order.id}</h2>
              <h4 className='fw-bold text-primary mx-4'>processing</h4>
            </div>
            <p>you have ordered {order.cartItems.length} items</p>
            <div className='d-flex'>
              {order.cartItems.map((item)=>{
                return  <img src={item.product.imageCover} className='img-thumbnail mx-3' style={{width:150}} key={item._id} />
              })}
            </div>
            <hr />
            <p> <strong>Total amount :</strong>  {order.totalOrderPrice} EGP</p>
          </div>

        </div>
      })}
    </>
  )
}
