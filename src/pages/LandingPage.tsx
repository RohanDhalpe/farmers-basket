import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BuyProducts from './BuyProductPage';

function Landing() {

  const authStatus = useSelector((state: any) => state.auth.status);
  const user_type = useSelector((state: any) => state?.auth?.userData?.user_type) ?? "Buyer";

  const navigate = useNavigate()
  const handleGetStarted = () => {
    if (authStatus) {

      if (user_type) {
        if (user_type == "Seller")
          navigate("/admin")
        else
          navigate("/userpage")
      }

    } else {
      navigate("/login")
    }
  }
  return (
    <div>
      <div>Landing Page</div>

      <button
        onClick={() => {
          handleGetStarted();
        }}
        className='p-4 bg-red-400 text-2xl'>Get Start</button>
    </div>
  )
}

export default Landing