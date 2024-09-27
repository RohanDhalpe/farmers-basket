import bgm from "../assets/bgm.jpg";
import Login from "./Login";
import Signup from "./Signup";
const Home = () => {
  return (<>
  
    <div style={{ display: "flex", justifyContent:"left", alignItems: "center", height:"100vh", overflow:"hidden"}}>
      
      <div style={{ flex: "1" }}>
        <img src={bgm} style={{ width: "100%", height: "100%" }} />
      </div>


      <div style={{ flex: "1" }}>
        <Login/>
      </div>
    </div>
   
  </>);
}

export default Home;