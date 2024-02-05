import toast from "react-hot-toast";


export const getAllProducts = async () => {
  
    try {
      const response = await fetch('https://json-server-u1lr.onrender.com/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const products = await response.json();
      // console.log('Products:', products);
      return products;
    } catch (error) {
      console.error('Error getting products:', error);
      return [];
    }
  };
  


  export const  removefav = async (product)=> {
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
        const favToRemove = products.find((pro) => pro.id === product.id);
  
        if (favToRemove) {
          const removeResponse = await fetch(
            `https://json-server-u1lr.onrender.com/favourites/${favToRemove.id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
  
          if (removeResponse.ok) {
            toast.success("Favorite Removed Successfully");
            console.log("Product removed from favorites successfully");
          } else {
            console.error(
              "Failed to remove product from favorites:",
              removeResponse.statusText
            );
          }
        } else {
          toast.error("Product not found in favorites");
          // console.log("not found")
        }
      }
    } catch (error) {
      console.error("Error during removing from favorites:", error);
    }
  }
  