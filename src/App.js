import React from "react";
import "./App.css";
import logo from './imgs/logo.png'
// import TopFold from './components/Topfold/TopFold.js'

import QRScan from "./qr-reader/qr-reader-component";

export default function App() {
  return (
    <div className="App">
      {/* < TopFold /> */}
      <QRScan />
    </div>
  );
}
