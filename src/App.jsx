import { useState } from "react";
import "./App.css";

function App() {

  const [url, setUrl] = useState("");
  const [expiry, setExpiry] = useState("");

  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleShorten = async () => {

    try {

      setError("");

      const response = await fetch(
        "http://localhost:8080/api/url/shorten",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            originalUrl: url,
            expiryMinutes: parseInt(expiry),
          }),
        }
      );

      const data = await response.json();

      setShortUrl(data.shortUrl);

    } catch (err) {

      setError("Backend not connected");

      console.log(err);
    }
  };

  return (
    <div className="container">

      <div className="card">

        <h1>🔗 URL Shortener</h1>

        <p>Shorten your long URLs into tiny links</p>

        <div className="inputs">

          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <input
            type="number"
            placeholder="Expiry Minutes"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />

        </div>

        <button onClick={handleShorten}>
          Shorten
        </button>

        {
          shortUrl && (
            <div className="result">

              <h3>Short URL</h3>

              <a
                href={shortUrl}
                target="_blank"
              >
                {shortUrl}
              </a>

            </div>
          )
        }

        {
          error && (
            <p className="error">
              {error}
            </p>
          )
        }

      </div>

    </div>
  );
}

export default App;