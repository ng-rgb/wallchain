import React from "react";
import "./App.css";
import Top from "./Top/Top"
import logo from './imgs/logo.png'
import QRScan from "./qr-reader/qr-reader-component";

export default function App() {
  return (
    <div className="App">
      <Top />
        {/* return <img src={logo} alt="Logo" />;
        <h3>immortalizing street art on the blockchain</h3>
      <h2>Explore the city & scan the murals</h2> */}
      {/* <QRScan /> */}
    </div>
  );
}

