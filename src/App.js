import "./App.css";
import logo from "./imgs/logo.png"
import Cards from "./components/Cards";
import Map from "./components/Map/Map"



function App() {
  return (
    <div className="App">
      <img src={logo} alt="Logo" />
      
      <Cards />
      <Map/>
    </div>
  );
}

export default App;





