import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";



export default function ProductDetails() {


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const { id } = useParams()
    console.log(id);
    // [productDetails,setProductDetails]=useState({})
    const [ProductDetails, setProductDetails] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    async function getProductDetails() {
        setIsLoading(true)
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products/' + id)
        setIsLoading(false)
        console.log(data.data);
        setProductDetails(data.data);

    }

    useEffect(() => {

        getProductDetails()

    }, [])
    return (
        <>
            {isLoading ? <>
                <div className='d-flex align-items-center justify-content-center my-5 py-5'>
                    <i className='fas fa-spin fa-spinner fa-2x'></i>
                </div>
            </> : <div className="row">
                <div className="col-md-3">
               
                    <Slider {...settings}>
                    {ProductDetails.images?.map((img,index)=>{
                          return <img key={index} src={img} className='w-100' alt="" />
                      
                    })}
                      
                    </Slider>
                </div>
                <div className="col-md-9 my-auto">
                    <h2 className='mt-2'>{ProductDetails?.title}</h2>
                    <h5 className='mt-2 font-sm text-main'>{ProductDetails?.category?.Name}</h5>
                    <p className='mt-2'>{ProductDetails?.description}</p>
                    <p className='mt-2 d-flex justify-content-between'>
                        <span>{ProductDetails?.price} EGP</span>
                        <span><i className='fas fa-star rating-color me-1'></i> <span>{ProductDetails?.ratingsAverage}</span></span>
                    </p>
                    <button className='btn bg-main text-white w-100 mt-2'>Add To Cart</button>
                </div>
            </div>

            }



        </>
    )
}
