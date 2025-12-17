import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-purple-900 text-white font-serif shadow-md">
      <div className="flex justify-between items-center px-10 py-5">
        
        {/* Logo */}
        <p className="text-3xl font-bold hover:text-purple-300 cursor-pointer">
          ShopCart
        </p>

        {/* Navbar */}
        <nav className="flex gap-10 text-xl">
          <Link className="hover:text-purple-300 transition-all duration-200" to="/">Home</Link>
          <Link className="hover:text-purple-300 transition-all duration-200" to="/product">Product</Link>
          <Link className="hover:text-purple-300 transition-all duration-200" to="/cart">Cart</Link>
          <Link className="hover:text-purple-300 transition-all duration-200" to="/orders">Orders</Link>

          {/* Login Button */}
          <Link 
            to="/login" 
            className="border border-white px-4 py-1 rounded-xl hover:bg-white hover:text-purple-900 transition-all duration-300"
          >
            Login
          </Link>

          <Link 
            to="/register" 
            className="border border-white px-4 py-1 rounded-xl hover:bg-white hover:text-purple-900 transition-all duration-300"
          >
            Register
          </Link>
        </nav>

      </div>
    </header>
  );
};

export default Header;
