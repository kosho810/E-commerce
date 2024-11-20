import  axios  from 'axios';
import Product from '../Product/Product';
import {useQuery} from 'react-query'

export default function Products() {


  async function getAllProducts() {

   return await axios.get('https://ecommerce.routemisr.com/api/v1/products')
   
  }

  const {data} = useQuery('products',getAllProducts,{
    cacheTime:5000
  })
  // console.log(data);
 

  return (
    <>
       <div className="row mt-4">
        {data?.data.data.map((product) => {
          return <div key={product.id} className="col-md-3">
            <Product product={product} />
          </div>
        })}
      </div>
    </>
  )
}
