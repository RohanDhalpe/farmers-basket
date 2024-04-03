import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FiUser } from "react-icons/fi"; // Importing FiUser icon from React Icons
import AddProductModal from "../components/AddProductModal";

export default function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown menu
  const navigate = useNavigate();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSignout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-emerald-500 shadow py-3"> {/* Increase padding and height */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-black">Admin Portal</h2> {/* Increase font size and change text color to white */}
            <div className="flex items-center">
              <ul className="flex space-x-6"> {/* Increase space between elements */}
                <li>
                  <button
                    className="text-lg text-black hover:bg-gray-200 px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-gray-500"
                    onClick={() => navigate("/viewproducts")}
                  >
                    List Products
                  </button>
                </li>
                <li>
                  <button
                    className="text-lg text-black hover:bg-gray-200 px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-gray-500"
                    onClick={() => navigate("/getusers")}
                  >
                    View Users
                  </button>
                </li>
                <li>
                  <button
                    className="text-lg text-black hover:bg-gray-200 px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-gray-500"
                    onClick={() => navigate("/getorders")}
                  >
                    View Orders
                  </button>
                </li>
              </ul>
              <button
                className="text-lg text-black hover:bg-gray-200 px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={openModal}
              >
                Add Products
              </button>
              <div className="relative ml-6">
                <FiUser
                  className="h-12 w-12 text-black cursor-pointer rounded-full p-1 hover:bg-black-200"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                {showDropdown && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <li>
                      <button
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => {
                          navigate("/profile");
                          setShowDropdown(false);
                        }}
                      >
                        Profile
                      </button>
                    </li>
                    <li>
                      <button
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={handleSignout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-10">
        {/* Your main content goes here */}
        {showModal && <AddProductModal closeModal={closeModal} />}
      </main>
    </div>
  );
}
