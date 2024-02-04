

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
      console.log('Products:', products);
      return products;
    } catch (error) {
      console.error('Error getting products:', error);
      return [];
    }
  };
  