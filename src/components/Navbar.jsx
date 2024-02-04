import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GiShoppingCart } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/operations/user';
import toast from 'react-hot-toast';
import { setToken } from '../redux/slices/profileSlice';

function Navbar() {
  const { token } = useSelector((state) => state.profile);
const navigate = useNavigate()
const dispatch = useDispatch()


  async function logout(){
    // dispatch(resetCart())
  dispatch(setToken(null))
    localStorage.clear()
    toast.success("Logged Out")
    navigate("/login")
  }
  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] bg-blue-300 font-semibold text-xl'>

<div className=' w-11/12 mx-auto flex justify-between'>
  <div className='text-3xl'>ShopKart.</div>

  <div >
      <ul className='flex gap-5 mr-10 justify-center items-center'>
          <li><Link to="/home">Products</Link></li>
          <li><Link to="/fav">Favorites</Link></li>

          {
            token === null ? (<li className=' cursor-pointer'><Link to="/login">Login</Link></li>) : (<li className=" cursor-pointer" onClick={logout} >Logout</li> )
          }
          <li><Link to="/cart"><GiShoppingCart /></Link></li>
      </ul>
  </div>
</div>
    </div>
  )
}

export default Navbar