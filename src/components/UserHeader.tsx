import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../api/authslice';
import { clearStoredState } from '../api/store';
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { CartItemData } from '../types/type';
import { Sidebar } from 'flowbite-react';
import { HiInbox, HiShoppingBag, HiUser, HiX, HiLogout, HiPhone, HiInformationCircle } from 'react-icons/hi';

interface UserHeaderProps {
  cartItems?: CartItemData[];
}

const UserHeader: React.FC<UserHeaderProps> = ({ cartItems }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setShowSidebar(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    navigate('/');
    dispatch(logout());
    clearStoredState();
  };

  const handleNavigateToCart = () => {
    navigate('/mycart');
  };

  const handleMyOrders = () => {
    navigate('/myorders');
  };

  const handleHelp = () => {
    
  };

  const handleContact = () => {
    
  };

  const handleAboutUs = () => {
    
  };

  return (
    <div>
      <div className="bg-white text-white py-1 fixed top-0 w-full z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg lg:text-3xl font-bold text-teal-800">AgriZone</h1>
            <div className="flex items-center">
              <FaShoppingCart onClick={handleNavigateToCart} className="mr-4 px-4 py-2 text-8xl text-teal-600 cursor-pointer hover:text-teal-800" />
              <div className="w-1"></div>
              <CgProfile onClick={() => setShowSidebar(!showSidebar)} className="mr-4 px-4 py-2 text-8xl text-teal-600 cursor-pointer hover:text-teal-800" />
            </div>
          </div>
        </div>

        {showSidebar && (
          <div ref={sidebarRef} className="fixed inset-0 z-50 flex justify-end">
            <Sidebar className="bg-gray-100 border-r-4 border-teal-500 p-6 w-64 h-full overflow-y-auto">
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Sidebar.Item href="#" icon={HiUser} className="text-teal-700 text-lg">
                    My Profile
                  </Sidebar.Item>
                  <Sidebar.Item href="/userpage" icon={HiShoppingBag} className="text-teal-700 text-lg">
                    Products
                  </Sidebar.Item>
                  <Sidebar.Item href="/myorders" icon={HiInbox} className="text-teal-700 text-lg">
                    My Orders
                  </Sidebar.Item>
                  <Sidebar.Item href="/userpage" icon={HiPhone} onClick={handleContact} className="text-teal-700 text-lg">
                    Contact
                  </Sidebar.Item>
                  <Sidebar.Item href="/userpage" icon={HiInformationCircle} onClick={handleAboutUs} className="text-teal-700 text-lg">
                    About Us
                  </Sidebar.Item>
                  <Sidebar.Item href="/login" icon={HiLogout} onClick={handleLogout} className="text-teal-700 text-lg">
                    Logout
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
              <button onClick={() => setShowSidebar(false)} className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-teal-500">
                <HiX className="w-6 h-6" />
              </button>
            </Sidebar>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserHeader;
