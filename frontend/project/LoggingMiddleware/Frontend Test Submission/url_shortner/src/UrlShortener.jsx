import React, { useState } from "react";
import { Log } from "../../../../LoggingMiddleware/LoggingMiddleware/log";

function UrlShortener() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    const token = import.meta.env.VITE_LOG_TOKEN;

    try {
      await Log("frontend", "info", "api", "Attempting to shorten URL", token);

      const res = await fetch(`https://tinyurl.com/api-create.php?url=${longUrl}`);
      if (!res.ok) throw new Error("API failed");

      const data = await res.text();
      setShortUrl(data);

      await Log("frontend", "debug", "api", "URL shortened successfully", token);
    } catch (err) {
      await Log("frontend", "error", "api", `Shortening failed: ${err}`, token);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Enter a long URL"
        style={{ padding: "8px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleShorten} style={{ padding: "8px 16px" }}>
        Shorten
      </button>

      {shortUrl && (
        <p style={{ marginTop: "20px" }}>
          ✅ Shortened URL:{" "}
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}

export default UrlShortener;
