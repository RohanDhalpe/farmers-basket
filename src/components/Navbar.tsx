import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/appLogo.png';

const Navbar = () => {
  return (
    <div className="bg-200 min-h-screen flex flex-col">
      <nav className="bg-teal-700 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <img src={logo} alt='logo' className="w-16 h-16 rounded-full shadow-md" />
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-wide">
              Farmers Basket
            </Link>
            <ul className="flex space-x-4 ml-4">
              <li>
                <Link to="/home" className="text-lg font-semibold hover:text-gray-300">Home</Link>
              </li>
              <li>
                <Link to="/menu" className="text-lg font-semibold hover:text-gray-300">Menu</Link>
              </li>
              <li>
                <Link to="/login" className="bg-white text-green-700 rounded-full px-4 py-2 text-lg font-semibold hover:bg-gray-200 transition-colors duration-300">Sign In</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Welcome 
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
