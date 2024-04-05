import { useNavigate } from 'react-router-dom';
import BuyProducts from './BuyProductPage';
import UserHeader from '../components/UserHeader';
import { useState } from 'react';

export const UserDashboard = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]); 

  return (
    <div className="bg-200 min-h-screen flex flex-col">
      <UserHeader cartItems={cartItems} />
      <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-4 mt-8"> 
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          <BuyProducts/>
        </h1>
      </div>
    </div>
  );
};

export default UserDashboard;
