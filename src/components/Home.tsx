import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-green-200 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-green-700 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link to="/" className="text-xl font-bold">
            Farmers Basket
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Welcome to Our App!
        </h1>
        <p className="text-lg text-center text-gray-800 mb-8">
          Hello!
        </p>
      </div>
    </div>
  );
};

export default Home;
