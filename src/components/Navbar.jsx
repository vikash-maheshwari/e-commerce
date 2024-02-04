import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GiShoppingCart } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/operations/user';

function Navbar() {
  const { token } = useSelector((state) => state.profile);
const navigate = useNavigate()
const dispatch = useDispatch()

  useEffect(()=>{
    console.log(token)
  },[])

  async function logout(){
   try{
    dispatch(logout(navigate))
   }catch(error){
    console.log(error)
   }
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
            token === null ? (<li><Link to="/login">Login</Link></li>) : (<li ></li> )
          }
          <li><Link to="/cart"><GiShoppingCart /></Link></li>
      </ul>
  </div>
</div>
    </div>
  )
}

export default Navbar