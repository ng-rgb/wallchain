import "./App.css";
import logo from "./imgs/logo.png"
import Cards from "./components/Cards";
import Map from "./components/Map/Map"
// import Intro from "./components/Intro/Intro"


function App() {
  return (
    <div className="App">
      <img src={logo} alt="Logo" />
      {/* <img src="logo" alt""" */}
      {/* <Intro /> */}
      <Cards />
      <Map/>
    </div>
  );
}

export default App;





