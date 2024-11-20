import axios from 'axios'
import React, {  useContext, useEffect, useState } from 'react'
import Cartproduct from '../CartProduct/Cartproduct';
import { Link } from 'react-router-dom'
import { cartContext } from '../../Contexts/CartContext';


export default function Cart() {
  const [cart, setCart] = useState({})
  const [timeOutId, setTimeOutId] = useState()
const [cartId,setCartId]=useState()
const {setCart: contextSetCart} =useContext(cartContext)

  // Get products added to your cart ========================>
  async function getLoggedInCartProducts() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
          token: localStorage.getItem('token')
        }
      }
      )
      console.log(data);
      setCartId(data.data._id)
      setCart(data)
    } catch (error) {
      console.log(error);
    }
  }

  // Remove item from cart =================================>
  async function removeFromCart(productId) {
    const { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
      headers: {
        token: localStorage.getItem("token")
      }
    })
    console.log(data);
    setCart(data);
    contextSetCart(data)
  }


  // clear all cart products =========================>
  async function clearCart() {
    const { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    setCart(data);
    contextSetCart(data);
  }

  // update product count =======================>
  function updateProductCount(productId, count) {
    clearTimeout(timeOutId)
    let x = setTimeout(async () => {
      if (count < 1) {
        removeFromCart(productId)
      }
      else {
        const { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + productId, { count }, {
          headers: {
            token: localStorage.getItem("token")
          }
        }
        )
        console.log(data);
        setCart(data);
        contextSetCart(data);
      }
    }, 1000);
    setTimeOutId(x)

  }


  useEffect(() => {
    getLoggedInCartProducts()
  }, [])
  return (
    <>
      {
        cart.data?.products.length > 0 ?
          <div className="my-5">
            {
              cart.data?.products.map((cartProduct, index) => {
                return <Cartproduct updateProductCount={updateProductCount} removeFromCart={removeFromCart} key={index} cartProduct={cartProduct} />
              })
            }

            <button onClick={clearCart} className='btn btn-outline-danger d-block ms-auto'>Clear Cart</button>
            <div className='d-flex justify-content-between mt-3'>
              <Link to={'/address/'+cartId} className='btn bg-main text-white'>CheckOut</Link>
              <p>Total cart Price: {cart.data?.totalCartPrice} EGP</p>
            </div>
          </div>
          :
          <h2 className='alert alert-warning text-center my-5 py-4'>No products in your cart</h2>

      }

    </>
  )
}
