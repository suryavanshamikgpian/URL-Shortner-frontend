import { useState } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setShortUrl('')
    setCopied(false)

    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    setLoading(true)

    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch('http://localhost:3000/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url }),
      })

      if (!response.ok) {
        throw new Error('Failed to shorten URL')
      }

      const data = await response.json()
      setShortUrl(data.shortUrl)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      setError('Failed to copy to clipboard')
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">🔗 URL Shortener</h1>
        <p className="subtitle">Shorten your long URLs into tiny links</p>

        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <input
              type="url"
              placeholder="Enter your long URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input"
            />
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Shortening...' : 'Shorten'}
            </button>
          </div>
        </form>

        {error && <p className="error">{error}</p>}

        {shortUrl && (
          <div className="result">
            <p className="result-label">Your shortened URL:</p>
            <div className="result-box">
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="short-url">
                {shortUrl}
              </a>
              <button onClick={copyToClipboard} className="copy-btn">
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
