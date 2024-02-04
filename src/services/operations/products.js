

export const getAllProducts = async () => {
  
    try {
      const response = await fetch('http://localhost:5000/products', {
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
  