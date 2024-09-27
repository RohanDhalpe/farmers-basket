import { useNavigate } from 'react-router-dom';
import BuyProducts from './BuyProduct';
import UserHeader from '../components/UserHeader';

export const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-200 min-h-screen flex flex-col">
      <UserHeader/>
      <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-4 mt-20"> 
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          <BuyProducts/>
        </h1>
      </div>
    </div>
  );
};

export default UserDashboard;
