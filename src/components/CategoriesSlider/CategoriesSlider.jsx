import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import axios from 'axios'

export default function CategoriesSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: true,
       
        autoplaySpeed: 2000,
        // cssEase: "linear"
    };

    const [categories, setCategories] = useState([])

    async function getAllCategories() {
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')

        setCategories(data.data)
    }

    useEffect(() => {
        getAllCategories()
    }, [])
    return (
        <>
            <Slider {...settings}>
                {categories.map((category, index) => {
                    return <div className='my-3' key={index}>
                        <img style={{height:200}} src={category.image} className='w-100' alt="" />
                        <h5>{category.name}</h5>
                    </div>
                })}

            </Slider>
        </>
    )
}
