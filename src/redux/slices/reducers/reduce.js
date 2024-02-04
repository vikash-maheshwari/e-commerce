import { combineReducers } from "@reduxjs/toolkit"

import cartReducer from "../cartSlice"
import profileReducer from "../profileSlice"

const rootReducer = combineReducers({
  profile: profileReducer,
  cart: cartReducer,

})

export default rootReducer
