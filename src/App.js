import React from "react";
import "./App.css";

import QRScan from "./qr-reader/qr-reader-component";

export default function App() {
  return (
    <div className="App">
      <h1>Wallchain</h1>
      <QRScan />
    </div>
  );
}
