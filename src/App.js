import "./App.css";
import logo from "./imgs/logo.png"
import Cards from "./components/Cards";
import Map from "./components/Map/Map"
import Button from 'react-bootstrap/Button';
import bog from "./imgs/bog.png";
import numbers from "./imgs/numbers.png";




function App() {
  return (
    <div className="App">
      <img src={logo} alt="Logo" />
      <div className="fs-2 text-uppercase text-light">
        <h4>Immortalizing street art on the blockchain</h4>
      </div>
      <div className="fs-1 text-uppercase text-light">
      <h1>Explore the city & scan the mural</h1>
      </div>
      <div className="mb-2">
        <Button variant="primary" size="lg">
          Explore
        </Button>{' '}
        </div>
      <Cards />
      <Button variant="primary" size="lg">
          How it works
        </Button>{' '}
        <img src={numbers} className="img-fluid" alt="numbers" />
        <img src={bog} className="img-fluid" alt="Logo" />
      <Map/>
    </div>
  );
}

export default App;





