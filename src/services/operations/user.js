import { setUser } from "../../redux/slices/profileSlice";
import { resetCart } from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";

export const login = (email, password,navigate) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:5000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const users = await response.json();
      const authenticatedUser = users.find(
        (user) => user.email === email && user.password === password
        
      );
      localStorage.setItem("token", JSON.stringify(authenticatedUser.email))

      if (authenticatedUser) {
        dispatch(setUser(authenticatedUser.email));
        navigate("/home")

        console.log('Login successful:', authenticatedUser);
        return authenticatedUser; // Returning the authenticated user for further use
      } else {
        console.error('Invalid credentials');
      }
    } else {
      console.error('Login failed:', response.statusText);
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
};

export const singup = async (email,password,navigate) =>{
  try{
    const response = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email,password})
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }else{
      navigate("/login")
    }

    
  const result = await response.json();
  console.log('User created successfully:', result);

  }catch(error){
    console.error('Error during Singup:', error);

  }
}


export function logout(navigate) {
  return (dispatch) => {
  
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.clear()
    toast.success("Logged Out")
    navigate("/login")
  }
}

