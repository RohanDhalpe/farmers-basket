import backimg from "../assets/bgm.jpg";
import Signup from "./Signup";
const Home = () => {
  return (<>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      
      <div style={{ flex: "1" }}>
        <img src={backimg} alt="Background" style={{ width: "100%", height: "100%" }} />
      </div>


      <div style={{ flex: "1" }}>
        <Signup/>
      </div>
    </div>
  </>);
}

export default Home;