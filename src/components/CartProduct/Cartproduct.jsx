import React, { useState } from 'react'

export default function Cartproduct({cartProduct,removeFromCart,updateProductCount}) {
  const[count,setCount]= useState(cartProduct.count)
  return (
    <>
      <div  className="cart-product shadow rounded-2 my-3">
          <div className="row align-items-center">
            <div className="col-md-2">
              <img className='w-100' src={cartProduct.product.imageCover} alt="" />
            </div>
            <div className="col-md-8">
              <h2>{cartProduct.product.title}</h2>
              <h5>{cartProduct.product.category.name}</h5>
              <p className='d-flex justify-content-between'>
                <span> {cartProduct.price} EGP</span>
                <span><i className='fas fa-star rating-color me-1'></i>{cartProduct.product.ratingsAverage}</span>
              </p>
              <p><span className='fw-bolder'>Total price :</span>{cartProduct.price * cartProduct.count} EGP</p>
            </div>
            <div className="col-md-2 ">
              <button onClick={()=>{removeFromCart(cartProduct.product._id)}} className='btn text-danger d-block ms-2'>Remove</button>
              <div className='d-flex align-items-center'>
                <button disabled={count==1} onClick={()=>{updateProductCount(cartProduct.product._id , count-1); setCount(count-1)}} className='btn bg-main text-white mx-2'>-</button>
                <span>{count}</span>
                <button onClick={()=>{updateProductCount(cartProduct.product._id , count+1); setCount(count+1)}} className='btn bg-main text-white mx-2'>+</button>
              </div>

            </div>
          </div>
        </div>
    </>
  )
}
