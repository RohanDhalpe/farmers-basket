import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearStoredState } from '../api/store';
import { logout } from '../api/authslice';
import { useDispatch } from 'react-redux';
import { FiUser } from 'react-icons/fi';
import AddProductModal from '../pages/AddProductModal';
import { Modal } from 'antd';
import UserModal from './UserModal'; 

function AdminHeader() {
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false); 
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
    setShowUserModal(!showUserModal); 
    setShowDropdown(false); 
  };

  return (
    <div>
      <nav className="bg-gradient-to-r from-blue-500 to-purple-500 shadow py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Admin Portal</h2>
            <div className="flex items-center">
              <ul className="flex space-x-6">
                <li>
                  <button
                    className="text-lg text-white hover:bg-green hover:text-blue-500 px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => navigate('/viewproducts')}
                  >
                    View Products
                  </button>
                </li>
                <li>
                  <button
                    className="text-lg text-white hover:bg-green hover:text-blue-500 px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => navigate('/getusers')}
                  >
                    View Users
                  </button>
                </li>
                <li>
                  <button
                    className="text-lg text-white hover:bg-green hover:text-blue-500 px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => navigate('/getorders')}
                  >
                    View Orders
                  </button>
                </li>
              </ul>
              <button
                className="text-lg text-white hover:bg-green hover:text-blue-500 px-4 py-2 rounded-md font-large focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={openModal}
              >
                Add Products
              </button>
              <div className="relative ml-6">
                <FiUser
                  className="h-12 w-12 text-black cursor-pointer rounded-full p-1 hover:bg-white hover:text-blue-500"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                {showDropdown && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <li>
                      <button
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={handleUserModal} 
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
            title="Admin Details"
            open={showUserModal}
            onCancel={handleUserModal} 
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
