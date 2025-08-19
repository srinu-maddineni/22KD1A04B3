import React, { useEffect } from "react";
import UrlShortener from "./UrlShortener";
import { Log } from "../../../../LoggingMiddleware/LoggingMiddleware/log";

function App() {
  useEffect(() => {
    const token = import.meta.env.VITE_LOG_TOKEN;
    Log("frontend", "info", "config", "App initialized", token);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🔗 URL Shortener</h1>
      <UrlShortener />
    </div>
  );
}

export default App;
