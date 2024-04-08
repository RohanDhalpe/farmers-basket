import { useNavigate } from 'react-router-dom';
import orderimg from '../assets/order.png';

function Orderconfirm() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/userpage'); 
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-customGreen"> 
   
      <div>
        <img src={orderimg} alt="Order" className="w-full" />
      </div>

  
      <button onClick={goBack} className="bg-teal-700 hover:bg-teal-800 text-white font-medium py-3 px-5 rounded-sm transition duration-300 mt-4">
        Back to Home
      </button>
    </div>
  );
}

export default Orderconfirm;
