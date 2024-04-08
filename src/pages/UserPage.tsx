import BuyProducts from './BuyProductPage';
import UserHeader from '../components/UserHeader';
import bag from "../assets/d.png"
import Footer from '../pages/Footer';

export const UserDashboard = () => {
  return (
    <>
      <div className="bg-200 min-h-screen flex flex-col">
        <UserHeader />

    
        <div className='bg-teal-200 mt-5 w-full h-[900px] flex justify-center items-center'>
          <img src={bag} alt="Bag" width="1600" height="1500" className="mb-90" />
        </div>

        <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-4 mt-8">
          <BuyProducts />
        </div>
        <Footer />
      </div>

    </>
  );
};

export default UserDashboard;
