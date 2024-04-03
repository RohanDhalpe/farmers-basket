import React, { useState } from 'react'
import logo from '../assets/appLogo.png';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import UserModal from './UserModal';
function UserHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setOpen(true);
  };


  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  return (
    <div>
      <nav className="bg-teal-700 text-white py-4 fixed top-0 w-full z-10">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            <img src={logo} alt='logo' className="w-16 h-16 rounded-full shadow-md mr-2" />
            <h1 className="text-lg lg:text-xl font-bold">Farmer's Market</h1>
          </div>
          <div className="flex items-center">
            <button onClick={() => navigate('/myorders')} className="mr-4 px-4 py-2 text-lg rounded-lg bg-teal-500 hover:bg-teal-600 focus:outline-none focus:bg-teal-600">My Orders</button>
            <button onClick={() => {
              showModal()
            }} className="mr-4 px-4 py-2 text-lg rounded-lg bg-teal-500 hover:bg-teal-600 focus:outline-none focus:bg-teal-600">Profile</button>
            <button onClick={handleLogout} className="px-4 py-2 text-lg rounded-lg bg-teal-500 hover:bg-teal-600 focus:outline-none focus:bg-teal-600">Logout</button>
          </div>
        </div>
      </nav>
      <Modal
        title="User Details"
        open={open}
        onCancel={handleCancel}
        footer={null}
      >
      <UserModal/>
      </Modal>
    </div>
  )
}

export default UserHeader