import React, { useState } from "react";
import { QrReader } from "@blackbox-vision/react-qr-reader";

export default function App() {
  const [on, toggle] = useState(true);
  const [data, setData] = useState("NULL");

  return (
    <div className="App">
      <button onClick={() => toggle(!on)} style={{ marginBottom: 16 }}>
        {on ? "Unmount QR Reader" : "Mount QR Reader"}
      </button>
      {on && (
        <QrReader
          resolution={600}
          facingMode="environment"
          onScan={decoded => setData(decoded)}
          onError={err => console.info(err)}
        />
      )}
      <div>
        <p>
          El valor del QR es:{" "}
          {typeof data === "object" ? JSON.stringify(data) : data}
        </p>
      </div>
    </div>
  );
}
