import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams,Link } from 'react-router-dom';
import { addToCart } from "../redux/slices/cartSlice"
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import toast from 'react-hot-toast';
import { FaHeart } from "react-icons/fa";

function SingleProducts() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
const dispatch = useDispatch()
const [fav,setFav] =useState(false)

  useEffect(() => {
    // Fetch product by ID using a GET request
    console.log(id)
    async function fetchProductData() {
      try {
        const response = await fetch(`https://json-server-u1lr.onrender.com/products?id=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const productData = await response.json();
          setProduct(productData);
        } else {
          console.error('Failed to fetch product:', response);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    }

    // Call the fetchProductData function
    fetchProductData();
    console.log(product)
  }, [id]);


  async function addfav(product) {
    try {
      // Assuming you have a backend API endpoint to handle adding favorites
      const result = await fetch(`https://json-server-u1lr.onrender.com/favourites`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
       
      });

      if (result.ok) {
        const products = await result.json();
        const favYes = products.find(
          (pro) => pro.id === product.id 
        );
      if(favYes){
        toast.error("products All alredy in favrat")
        console.log("alredy added")
        return 

      }
      }


      const response = await fetch(`https://json-server-u1lr.onrender.com/favourites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Pass the product data in the request body
        body: JSON.stringify(product),
      });
  
      if (response.ok) {
        // Handle successful addition to favorites
      toast.success("Favrate ADded Successful")

        console.log('Product added to favorites successfully');
      } else {
        // Handle unsuccessful response
        console.error('Failed to add product to favorites:', response.statusText);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during adding to favorites:', error);
    }
  }


  function getShortenedDescription(description, wordLimit) {
    const words = description.split(' ');
    const truncatedDescription = words.slice(0, wordLimit).join(' ');
  
    // Add ellipsis if the description is truncated
    if (words.length > wordLimit) {
      return `${truncatedDescription}...`;
    }
  
    return truncatedDescription;
  }
  
  return (
    <div className='w-11/12 mx-auto mt-16  p-8'>
    
    <div>
    {
        product?.map((prod)=>(
          <div key={prod.id} className='flex justify-around gap-10 w-[80%] bg-slate-100 p-4'>
            <div className='w-[40%]'>
              <img src={prod?.image} alt="" width={200} className='border' />
            </div>

            <div>
              <p className='font-bold text-xl'>{prod?.title}</p>
              <p className='pt-4 pr-28'>{getShortenedDescription(prod.description, 19)}</p>

            </div>
            
            <div className='mt-2 flex justify-between'>  
        <button 
onClick={() => addfav(product)}
  className={`text-gray-600 text-2xl px-4 py-2 rounded-md hover:scale-110 ${fav ? "text-red-600" : "text-gray-600"}`}>
  <FaHeart />
</button>
          <button
          onClick={()=>dispatch(addToCart(product))}
           className='text-gray-600 text-2xl   px-4 py-2 rounded-md hover:scale-110'>
          <MdOutlineShoppingCartCheckout />

          </button>
          </div>
          </div>
          
        ))
      }
      <div className='text-center '>
      <Link to='/cart' className='bg-blue-800 p-2 px-8 font-bold text-white rounded-xl hover:scale-110 hover:bg-red-500 '>Buy Now</Link>
      </div>
    </div>

   
    </div>
  );
}

export default SingleProducts;
