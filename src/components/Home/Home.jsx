import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product';
import img1 from '../../assets/1.jpg'
import img2 from '../../assets/2.jpg'
import slider1 from '../../assets/grocery-banner.png'
import slider2 from '../../assets/grocery-banner-2.jpeg'
import Slider from "react-slick";
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';


export default function Home() {
  const [products, setProducts] = useState([])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
     
  };

  async function getAllProducts() {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    setProducts(data.data);
  }
  useEffect(() => {
    getAllProducts();
  }, [])
  return (
    <>
      <header>
        <div className="row my-2">
          <div className="col-md-10  p-0">
            <Slider {...settings}>
<div ><img src={slider1} className='w-100' alt="" /></div>
<div ><img src={slider2} className='w-100 ' alt="" /></div>

            </Slider>

          </div>
          <div className="col-md-2  p-0 ">
            <div>
            <img src={img1} className='w-100 rounded ' alt="" />
            </div>
           <div>
           <img src={img2} className='w-100 rounded' alt="" />
           </div>
            
          </div>
        </div>
      </header>

      <CategoriesSlider/>
      <div className="row mt-4">
        {products.map((product) => {
          return <div key={product.id} className="col-md-3">
            <Product product={product} />
          </div>
        })}
      </div>
    </>
  )
}
