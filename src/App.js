import "./App.css";
import logo from "./imgs/logo.png"
import Cards from "./components/Cards";
import Map from "./components/Map/Map"
import Button from 'react-bootstrap/Button';




function App() {
  return (
    <div className="App">
      <img src={logo} alt="Logo" />
      <div className="fs-1">
      <h2>Explore the city & scan the mural</h2>
      </div>
      <div className="mb-2">
        <Button variant="primary" size="lg">
          Explore
        </Button>{' '}
        </div>
      <Cards />
      
      <Map/>
    </div>
  );
}

export default App;





