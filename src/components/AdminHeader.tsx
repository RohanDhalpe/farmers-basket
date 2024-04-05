import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearStoredState } from '../api/store';
import { logout } from '../api/authslice';
import { useDispatch } from 'react-redux';
import { FiUser } from 'react-icons/fi';
import AddProductModal from './AddProductModal';
import { Modal } from 'antd'; // Import Modal component
import UserModal from './UserModal'; // Assuming you have a UserModal component

function AdminHeader() {
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false); // State for user details modal
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openModal = () => {
    setShowModal(true);
  };

  const handleSignout = () => {
    localStorage.removeItem('token');
    navigate('/');
    dispatch(logout());
    clearStoredState();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleUserModal = () => {
    setShowUserModal(!showUserModal); // Toggle user details modal visibility
    setShowDropdown(false); // Close the dropdown menu
  };

  return (
    <div>
      <nav className="bg-emerald-500 shadow py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-black">Admin Portal</h2>
            <div className="flex items-center">
              <ul className="flex space-x-6">
                <li>
                  <button
                    className="text-lg text-black hover:bg-gray-200 px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-gray-500"
                    onClick={() => navigate('/viewproducts')}
                  >
                    View Products
                  </button>
                </li>
                <li>
                  <button
                    className="text-lg text-black hover:bg-gray-200 px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-gray-500"
                    onClick={() => navigate('/getusers')}
                  >
                    View Users
                  </button>
                </li>
                <li>
                  <button
                    className="text-lg text-black hover:bg-gray-200 px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-gray-500"
                    onClick={() => navigate('/getorders')}
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
                        onClick={handleUserModal} // Open user details modal
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
          {showModal && <AddProductModal closeModal={closeModal} />}
          
          <Modal
            title="User Details"
            visible={showUserModal}
            onCancel={handleUserModal} // Close user details modal
            footer={null}
          >
            <UserModal />
          </Modal>
        </div>
      </nav>
    </div>
  );
}

export default AdminHeader;
