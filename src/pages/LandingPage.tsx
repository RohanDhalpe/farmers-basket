import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import landingImg from "../assets/l.png";

function Landing() {
  const authStatus = useSelector((state: any) => state.auth.status);
  const user_type = useSelector((state: any) => state?.auth?.userData?.user_type) ?? "Buyer";
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (authStatus) {
      if (user_type) {
        if (user_type === "Seller")
          navigate("/admin");
        else
          navigate("/userpage");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="relative w-screen h-screen">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center filter blur-lg"
        style={{ backgroundImage: `url(${landingImg})` }}
      />
  
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center text-black">
        <h1 className="text-6xl font-medium mb-20 animate-move-in-slow font-roboto">
          Welcome to our Agriculture Products Marketplace
        </h1>
        <button
          onClick={() => handleGetStarted()}
          className="px-6 py-4 bg-teal-800 text-white text-2xl font-semibold rounded-md hover:bg-teal-700 transition duration-300 transform hover:scale-105"
        >
          Shop Now
        </button>
        <p className="text-2xl text-gray-800 mb-12 mt-10 font-medium leading-relaxed">
          Find the freshest produce from local farmers and growers. Our platform connects you directly with suppliers, ensuring quality and traceability.
        </p>
      </div>
    </div>
  );
  
}

export default Landing;
