// // import { useState } from 'react'
// // import logo from '../assets/appLogo.png';
// // import { useNavigate } from 'react-router-dom';
// // import { Modal } from 'antd';
// // import UserModal from './UserModal';
// // import { useDispatch } from 'react-redux';
// // import { logout } from '../api/authslice';
// // import { clearStoredState } from '../api/store';
// // import { CgProfile } from "react-icons/cg";

// // function UserHeader() {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch()
// //   const handleLogout = () => {
// //     navigate('/');
// //     dispatch(logout());
// //     clearStoredState();
// //   };
// //   const [open, setOpen] = useState(false);
// //   const [confirmLoading, setConfirmLoading] = useState(false);
// //   const [modalText, setModalText] = useState('Content of the modal');

// //   const showModal = () => {
// //     setOpen(true);
// //   };


// //   const handleCancel = () => {
// //     console.log('Clicked cancel button');
// //     setOpen(false);
// //   };

// //   const handleOpenModal = () => {

// //   }

// //   return (
// //     <div>
// //       <nav className="bg-white text-white py-1 fixed top-0 w-full z-10">
// //         <div className="container mx-auto flex justify-between items-center px-4">

// //           <div className="flex items-center">
// //             <img src={logo} alt='logo' className="w-16 h-16 rounded-full shadow-md mr-2" />
// //             <h1 className="text-lg lg:text-xl font-bold text-teal-400 ml-2">Farmer's Market</h1>
// //           </div>


// //           <div className="flex items-center">
// //             <button onClick={() => navigate('/myorders')} className="mr-4 px-4 py-2 text-lg rounded-lg bg-teal-500 hover:bg-teal-600 focus:outline-none focus:bg-teal-600">My Orders</button>
// //             <button onClick={() => navigate('/mycart')} className="mr-4 px-4 py-2 text-lg rounded-lg bg-teal-500 hover:bg-teal-600 focus:outline-none focus:bg-teal-600">My Cart</button>
// //             <button onClick={handleLogout} className="px-4 py-2 text-lg rounded-lg bg-teal-500 hover:bg-yellow-500 focus:outline-none focus:bg-teal-600">Logout</button>
// //             <CgProfile onClick={() => {
// //               showModal()
// //             }} className="mr-4 px-4 py-2 text-8xl text-black"></CgProfile>
// //           </div>
// //         </div>
// //       </nav>
// //       <div className='bg-teal-100 w-full h-[800px]'>

// //       </div>
// //       <Modal
// //         title="User Details"
// //         open={open}
// //         onCancel={handleCancel}
// //         footer={null}
// //       >
// //         <UserModal />
// //       </Modal>
// //     </div>
// //   )
// // }



import React, { useState } from 'react';
import logo from '../assets/appLogo.png';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import UserModal from './UserModal';
import { useDispatch } from 'react-redux';
import { logout } from '../api/authslice';
import { clearStoredState } from '../api/store';
import { CgProfile } from "react-icons/cg";
import { CartItemData } from '../types/type';

interface UserHeaderProps {
  cartItems: CartItemData[];
}

const UserHeader: React.FC<UserHeaderProps> = ({ cartItems }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    navigate('/');
    dispatch(logout());
    clearStoredState();
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleNavigateToCart = () => {
    navigate('/mycart');
  };

  return (
    <div>
      <nav className="bg-white text-white py-1 fixed top-0 w-full z-10">
        <div className="container mx-auto flex justify-between items-center px-4">

          <div className="flex items-center">
            <img src={logo} alt='logo' className="w-16 h-16 rounded-full shadow-md mr-2" />
            <h1 className="text-lg lg:text-xl font-bold text-teal-400 ml-2">Farmer's Market</h1>
          </div>

          <div className="flex items-center">
            <button onClick={() => navigate('/myorders')} className="mr-4 px-4 py-2 text-lg rounded-lg bg-teal-500 hover:bg-teal-600 focus:outline-none focus:bg-teal-600">My Orders</button>
            <button onClick={handleNavigateToCart} className="mr-4 px-4 py-2 text-lg rounded-lg bg-teal-500 hover:bg-teal-600 focus:outline-none focus:bg-teal-600">My Cart</button>
            <button onClick={handleLogout} className="px-4 py-2 text-lg rounded-lg bg-teal-500 hover:bg-yellow-500 focus:outline-none focus:bg-teal-600">Logout</button>
            <CgProfile onClick={showModal} className="mr-4 px-4 py-2 text-8xl text-black"></CgProfile>
          </div>
        </div>
      </nav>
      <div className='bg-teal-100 w-full h-[800px]'>

      </div>
      <Modal
        title="User Details"
        open={open}
        onCancel={handleCancel}
        footer={null}
      >
        <UserModal />
      </Modal>
    </div>
  );
}

export default UserHeader;
