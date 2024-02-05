import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdCurrencyRupee } from "react-icons/md";
import { FaRegStar } from "react-icons/fa6";
import { UseDispatch, useDispatch } from 'react-redux';
import { addToCart } from "../redux/slices/cartSlice"
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

function Fav() {

    const [favorites, setFavorites] = useState([]);
    const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    // Fetch favorite products
    async function fetchFavoritesData() {
      setLoading(true)
      try {
        const response = await fetch('https://json-server-u1lr.onrender.com/favourites', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // You may include additional headers as needed
          },
        });

        if (response.ok) {
          const favoritesData = await response.json();
          setFavorites(favoritesData);
        } else {
          console.error('Failed to fetch favorites:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
      setLoading(false)

    }

    // Call the fetchFavoritesData function
    fetchFavoritesData();
  }, []);

  return (
    <div className='w-full min-h-screen '>
    <div className='w-11/12 mx-auto '>
        
          <div className='flex justify-center mt-3 font-bold text-2xl'>
            <h2>All Favorites</h2>
          </div>

     {
      loading ? ( <div className="grid min-h-[calc(100vh-6.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>) : (   
            favorites.length > 0 ? (    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4'>
  {
    favorites.map((product) => (

  <div key={product.id} className='bg-white shadow-md rounded-md overflow-hidden'>
  <Link to={`/singleProducts/${product.id}`}>
    
      <img src={product.image} alt={product.title} className='w-full h-48 object-cover' />
      <div className='p-4'>
        <h3 className='text-sm font-semibold mb-2'>{product.title}</h3>
        <div className='flex justify-between items-center'>
         <div>
         <p className=' font-bold flex items-center '><MdCurrencyRupee />{product.amount}</p>
          
          <div className='flex items-center text-sm'>
            <p className='text-white font-bold flex items-center gap-1 px-2 bg-green-500'><FaRegStar />{product.rating}</p>
          </div>
         </div>

        </div>
        
       
      </div>
    </Link>
    <div className='mt-2 flex justify-between'>  
       
          <button
          onClick={()=>dispatch(addToCart(product))}
           className='text-gray-600 text-2xl   px-4 py-2 rounded-md hover:scale-110'>
          <MdOutlineShoppingCartCheckout />

          </button>
          </div>
    </div>
 
  ))
  }
</div>) : (<div className=' text-3xl  flex justify-center items-center mt-14 font-bold'> No Favorites Items</div>) 
)
     }

    </div>
      
    </div>
  )
}

export default Fav