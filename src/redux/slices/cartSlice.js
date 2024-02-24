import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
    totalCount: localStorage.getItem("totalCount")
    ? JSON.parse(localStorage.getItem("totalCount"))
    : 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const index = state.cart.findIndex((item) => item.product.id === product.id)

      if (index >= 0) {
        toast.error("Product already in cart")
        return
      }
      state.cart.push({product,quantity: 1})
      state.totalItems++
      state.total += Number(product.amount)
      localStorage.setItem("cart", JSON.stringify(state.cart))
      localStorage.setItem("total", JSON.stringify(state.total))
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
      // show toast
      toast.success("Product added to cart")
    },
    
    removeFromCart: (state, action) => {
      const productID = action.payload
      const index = state.cart.findIndex((item) => item.product.id === productID)

      if (index >= 0) {
        // If the product is found in the cart, remove it
        state.totalItems--
        state.total -= Number(state.cart[index].product.amount * state.cart[index].quantity)
        state.cart.splice(index, 1)
        // Update to localstorage
        localStorage.setItem("cart", JSON.stringify(state.cart))
        localStorage.setItem("total", JSON.stringify(state.total))
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
        // show toast
        toast.success("Product removed from cart")
      }
    },
    resetCart: (state) => {
      state.cart = []
      state.total = 0
      state.totalItems = 0
      // Update to localstorage
      localStorage.removeItem("cart")
      localStorage.removeItem("total")
      localStorage.removeItem("totalItems")
    },

    addTotal: (state, action) => {
      const product = action.payload;
      const productInCart = state.cart.find((item) => item.product.id === product.product.id);
    
      if (productInCart) {
        state.total += Number(productInCart.product.amount);
        productInCart.quantity += 1;
      }
    },
    
    removeTotal: (state, action) => {
      const product = action.payload;
      const productInCart = state.cart.find((item) => item.product.id === product.product.id);
    
      if (productInCart && productInCart.quantity > 0) {
        state.total -= Number(productInCart.product.amount);
        productInCart.quantity -= 1;
      }
    },
    
  },
})

export const { addToCart, removeFromCart, resetCart,addTotal,removeTotal } = cartSlice.actions

export default cartSlice.reducer
