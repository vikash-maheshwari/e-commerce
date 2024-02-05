import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { addToCart } from "../redux/slices/cartSlice";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";

function SingleProducts() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  const [fav, setFav] = useState(false);
  const [loading,setLoading] = useState(false)
  

  useEffect(() => {
    
    async function fetchProductData() {
      setLoading(true)
      try {
        const response = await fetch(
          `https://json-server-u1lr.onrender.com/products?id=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const productData = await response.json();
          setProduct(productData);
        } else {
          console.error("Failed to fetch product:", response);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
      setLoading(false)

    }

    fetchProductData();
    // console.log(product);
  }, [id]);

  async function addfav(product) {
    try {
      const result = await fetch(
        `https://json-server-u1lr.onrender.com/favourites`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (result.ok) {
        const products = await result.json();
        const favYes = products.find((pro) => pro.id === product.id);
        if (favYes) {
          toast.error("Product  Already Add in Favorite");
          console.log("already added");
          return;
        }
      }

      const response = await fetch(
        `https://json-server-u1lr.onrender.com/favourites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      if (response.ok) {
        toast.success("Favorite Added Successful");

        // console.log("Product added to favorites successfully");
      } else {
        // Handle unsuccessful response
        console.error(
          "Failed to add product to favorites:",
          response.statusText
        );
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during adding to favorites:", error);
    }
  }

  function getShortenedDescription(description, wordLimit) {
    const words = description.split(" ");
    const truncatedDescription = words.slice(0, wordLimit).join(" ");

    // Add ellipsis if the description is truncated
    if (words.length > wordLimit) {
      return `${truncatedDescription}...`;
    }

    return truncatedDescription;
  }

  return (
    <div className="w-11/12 mx-auto mt-16  p-8  flex justify-center ">
     {
      loading ? (<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
 <div className="spinner"></div>
 </div> ) :(
        <div>
        {product?.map((prod) => (
          <div
            key={prod.id}
            className="w-full flex justify-center"
          >
         <div className="flex  gap-10 p-16 w-[50%] bg-slate-300 shadow-lg">
         <div className="w-[40%]">
              <img src={prod?.image} alt="" width={200} className="border-2 rounded-lg" />
            </div>

           <div className="w-[60%]">
           <div >
              <p className="font-bold text-xl">{prod?.title}</p>
              <p className="pt-4 text-gray-800">
                {getShortenedDescription(prod.description, 19)}
              </p>
              <p className="flex items-center mt-2 text-xl font-bold text-gray-900">   <MdCurrencyRupee /> {prod?.amount}</p>
            </div>

            <div className="mt-2 flex justify-end">
              <button
                onClick={() => addfav(product)}
                className={`text-gray-600 text-2xl px-4 py-2 rounded-md hover:scale-110 ${
                  fav ? "text-red-600" : "text-gray-600"
                }`}
              >
                <FaHeart />
              </button>
              <button
                onClick={() => dispatch(addToCart(product))}
                className="text-gray-600 text-2xl   px-4 py-2 rounded-md hover:scale-110"
              >
                <MdOutlineShoppingCartCheckout />
              </button>
            </div>
           </div>
         </div>
          </div>
        ))}
        <div className="w-[100%] text-center -mt-10">
          <Link
            to="/cart"
            className="bg-blue-800 p-2 px-8 font-bold text-white rounded-xl hover:scale-110 hover:bg-red-500 "
            onClick={() => dispatch(addToCart(product[0]))}
          >
            Buy Now
          </Link>
        </div>
      </div>
      )
     }
    </div>
  );
}

export default SingleProducts;
