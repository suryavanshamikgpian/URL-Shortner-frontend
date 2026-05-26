import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Login/Login.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle validation errors
                if (data.errors) {
                    setError(Object.values(data.errors).join(', '));
                } else {
                    setError(data.error || 'Signup failed');
                }
                return;
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('userName', data.name);
            localStorage.setItem('userEmail', data.email);
            navigate('/');
        } catch (err) {
            setError('Backend not connected');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-glow auth-glow-1"></div>
            <div className="auth-glow auth-glow-2"></div>

            <div className="auth-card">
                <div className="auth-header">
                    <span className="auth-icon">✨</span>
                    <h1>Create Account</h1>
                    <p>Start shortening URLs in seconds</p>
                </div>

                <form onSubmit={handleSignup} className="auth-form">
                    <div className="input-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Min. 6 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>

                    {error && <p className="auth-error">{error}</p>}

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
