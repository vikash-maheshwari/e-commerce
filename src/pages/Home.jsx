import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/operations/products";
import { MdCurrencyRupee } from "react-icons/md";
import { FaRegStar } from "react-icons/fa6";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [fav, setFav] = useState(false);
  const [loading, setLoading] = useState(false);
  const {cart} = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const result = await getAllProducts();
        setProducts(result);
        // console.log(result);
      } catch (error) {
        console.log("Error during fetching products", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

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

      // check products already exits or not in fav. list
      if (result.ok) {
        const products = await result.json();
        const favYes = products.find((pro) => pro.id === product.id);
        if (favYes) {
          toast.error("Product Already In Favourite");
          // console.log("already added")
          return;
        }
      }

      //if not exits to add in fav. list
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

        console.log("Product added to favorites successfully");
      } else {
        console.error(
          "Failed to add product to favorites:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error during adding to favorites:", error);
    }
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };


  return (
    <div className="w-full min-h-screen ">
      <div className="w-11/12 mx-auto ">
        <div className="flex justify-center mt-3 font-bold text-2xl">
          <h2>All Products</h2>
        </div>

        {loading ? (
          <div className="grid min-h-[calc(100vh-6.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-md overflow-hidden"
              >
                <Link to={`/singleProducts/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-sm font-semibold mb-2">
                      {product.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className=" font-bold flex items-center ">
                          <MdCurrencyRupee />
                          {product.amount}
                        </p>

                        <div className="flex items-center text-sm">
                          <p className="text-white font-bold flex items-center gap-1 px-2 bg-green-500">
                            <FaRegStar />
                            {product.rating}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="mt-2 flex justify-between">
                  <button
                    onClick={() => addfav(product)}
                    className={`text-gray-600 text-2xl px-4 py-2 rounded-md hover:scale-110 ${
                      fav ? "text-red-600" : "text-gray-600"
                    }`}
                  >
                    <FaHeart />
                  </button>


                 <div className="mt-2 flex justify-between">
            {cart.some((item) => item.product.id === product.id) ? (
              <Link to="/cart" className="text-gray-600 text-2xl px-4 py-2 rounded-md hover:scale-110">
                Go to Cart
              </Link>
            ) : (
              <button
                onClick={() => handleAddToCart(product)}
                className="text-gray-600 text-2xl px-4 py-2 rounded-md hover:scale-110"
              >
                <MdOutlineShoppingCartCheckout />
              </button>
            )}
            {/* Heart icon button for favorite */}
          </div>

  

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
