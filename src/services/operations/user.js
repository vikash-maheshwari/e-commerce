import { setUser } from "../../redux/slices/profileSlice";
import { setToken } from "../../redux/slices/profileSlice";
import toast from "react-hot-toast";

export const login = (email, password,navigate) => async (dispatch) => {
 
  try {
    const response = await fetch('https://json-server-u1lr.onrender.com/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      toast.success("Login Successful")

      const users = await response.json();
      const authenticatedUser = users.find(
        (user) => user?.email === email && user?.password === password
        
      );
      localStorage.setItem("token", JSON.stringify(authenticatedUser.email))
  dispatch(setToken(JSON.stringify(authenticatedUser.email)))


      if (authenticatedUser) {
        dispatch(setUser(authenticatedUser?.email));
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
    toast.error("Login Failed")

    console.error('Error during login:', error);
  }

};

export const singup = async (email,password,navigate) =>{
  const toastId = toast.loading("Loading...")

  try{
    const response = await fetch('https://json-server-u1lr.onrender.com/users', {
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
      toast.success("Signup Successful")

    }

    
  const result = await response.json();
  // console.log('User created successfully:', result);

  }catch(error){
    toast.error("Signup Failed")

    console.error('Error during Singup:', error);

  }
  toast.dismiss(toastId)

}


export function logout(navigate) {
  return () => {
  
    
   
    localStorage.clear()
    toast.success("Logged Out")
    navigate("/login")
  }
}

