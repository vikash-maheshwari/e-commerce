import { Routes, Route } from "react-router-dom";
import OpenRoute from "./components/OpenRoute";
import PrivateRoute from "./components/PrivateRoute";

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Singup";  // Corrected the typo in the import
import SingleProducts from "./pages/SingleProducts";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Fav from "./pages/Fav";

function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-slate-500" >
      <Navbar />

      <Routes>
      
        <Route path="/singup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<OpenRoute><Login /></OpenRoute>} />


        <Route path="/fav" element={<Fav />} />



        {/* Protected routes */}
        <Route path="/singleProducts/:id" element={<SingleProducts />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
