import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart,addTotal,removeTotal,resetCart } from "../redux/slices/cartSlice"
import { MdCurrencyRupee } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";
import { FaPlus, FaUnsplash } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import toast from 'react-hot-toast';
import Swal from "sweetalert2";

function Cart() {

  const { total,cart,totalCount } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  

  useEffect(()=>{
    console.log(Number(total))
    console.log(cart)

  },[removeFromCart])


  function add(product,quantity){
   dispatch(addTotal(product))
  }

  
  function mini(product,quantity){
    
    if(quantity >=2){
      dispatch(removeTotal(product))

    }
    
  }




  async function order() {
    try {
      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cart),
      });
  
      if (response.ok) {
        const result = await response.json();
        // Handle the result, e.g., display a success message
        dispatch(resetCart())
        toast.success("Order Succesfully")

        Swal.fire({
          title: `Order Successfull 
          
          `,
          text: `Thankyou`,
          icon: "success",
        });

        console.log('Order placed successfully:', result);
      } else {
        // Handle unsuccessful response
        console.error('Failed to place order:', response.statusText);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during order placement:', error);
    }
  }



  return (
    <div className="flex gap-10 w-11/12 mx-auto mt-4">


          <div className='w-[50%] flex flex-col   p-4 rounded-sm'>
          <div className=' mb-10 font-bold text-2xl'>My Cart</div>
          {
    cart.map((prod)=>(
      <div key={prod.id} className='flex gap-4 mt-4 border-b-2 border-2 w-[70%] bg-white p-4'>
        <img src={prod.product.image} alt="" width={100} height={50} className='border'/>
        <div>
          <p>{prod.product.title}</p>
<div className='flex justify-between'>
<p className='flex items-center'><MdCurrencyRupee />{prod.product.amount}</p>
<button
onClick={()=>dispatch(removeFromCart(prod.product.id))}>
<CiCircleRemove className='text-red-700 text-xl font-extrabold cursor-pointer'/>

</button>
<div>

</div>

</div>
<div className='flex gap-4 items-center mt-3'>

<FaPlus onClick={()=>add(prod,prod.quantity)}/>{prod.quantity}<FaMinus onClick={()=>mini(prod,prod.quantity)}/>

</div>
        </div>
      </div>
    ))
   }
          </div>


          <div className='flex flex-col lg:w-[25%] gap-2 mt-5 bg-slate-200 border p-8 h-[10%] '>
    <h2 className='font-bold text-xl'>Price Details</h2>

    <div className='flex justify-between'>
      Price : <p> {total}</p>
    </div>
    <div className='flex justify-between'>
      Discount Price : <p>100</p>
    </div>

    <div className='flex justify-between'>
      Delivery Charge : <p>50</p>
    </div>
<hr />
<div className='flex justify-between my-6 font-semibold'>
      Total : <p>{
        total > 0 ? (<>{total-50}</>) : (<>0</>)
      }</p>
    </div>
    <div className='text-end'>
            <button 
            onClick={order}
            className=' bg-yellow-400 p-2 px-8 rounded-2xl font-bold '>Order Now</button>
          </div>
          </div>

         
  </div>
  )
}

export default Cart