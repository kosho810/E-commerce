import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import * as Yup from 'yup'
import axios from "axios";


export default function Address() {
    const [errorMsg,setErrorMsg]=useState('');
    const [isLoading,setIsLoading]=useState(false);
    let{cartId} = useParams()
    // console.log(cartId);

    const validationSchema = Yup.object({
        details : Yup.string().required('Address details is required'),
        phone : Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'enter valid phone number'),
        city : Yup.string().required('City is required'),

    })

    async function onSubmit(){
        setIsLoading(true)
        setErrorMsg('');
        try {
            console.log(values);
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{
                shippingAddress:values
            },{
                headers:{
                    token:localStorage.getItem('token')
                },
                params:{
                    url:'http://localhost:3000'
                }
            })
            console.log(data.session.url);
            window.open(data.session.url, '_self')
        } catch (error) {
            setErrorMsg(error.response.data.message)
        }
        setIsLoading(false)
    }

    const {handleSubmit,handleChange,handleBlur,values,errors,touched,isValid}=useFormik({
        initialValues:{
            details:'',
            phone:'',
            city:'',
        },
        onSubmit,
        validationSchema:validationSchema
    })


  return (
    <>
    <h2 className='mt-3'>Address:</h2>
      <form className='w-75 m-auto' onSubmit={handleSubmit}>
            <label htmlFor="details" className='my-1'>Details:</label>
            <input onChange={handleChange} onBlur={handleBlur} value={values.details} type="text" className='form-control mb-3' id='details' name='details' />
            {errors.details && touched.details && (
          <p className="alert alert-danger">{errors.details}</p>
        )}

            <label htmlFor="phone" className='my-1'>Phone:</label>
            <input onChange={handleChange} onBlur={handleBlur} value={values.phone} type="tel" className='form-control mb-3' id='phone' name='phone' />
            {errors.phone && touched.phone && (
          <p className="alert alert-danger">{errors.phone}</p>
        )}


            <label htmlFor="city" className='my-1'>City:</label>
            <input onChange={handleChange} onBlur={handleBlur} value={values.city} type="text" className='form-control mb-3' id='city' name='city' />
            {errors.city && touched.city && (
          <p className="alert alert-danger">{errors.city}</p>
        )}

        {
            isLoading?<button disabled type="button" className="btn bg-success px-3 text-white ms-auto d-block"><i className="fas fa-spin fa-spinner"></i></button>
            :<button type='submit' className='btn bg-main px-3 text-white ms-auto d-block' disabled ={!isValid || isLoading}>Order</button>
        }
            
        </form>
    </>
  )
}
