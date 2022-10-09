import React from "react";
import "./Top.css";
import logo from '../imgs/logo.png'
import Button from 'react-bootstrap/Button';



function Top() {
  return (
    <div className="App">
        return <img src={logo} alt="Logo" />;
        <h3>immortalizing street art on the blockchain</h3>
      <h2>Explore the city & scan the murals</h2>
      <button>Explore</button>
      <Button  variant="primary">
    Button as link
  </Button>
    </div>
  );
}

export default Top;