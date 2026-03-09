import React, { useState } from 'react';
import './Login.css';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Login failed');
      }

      // Store JWT in Chrome Storage for extension-wide access
      await storage.setItem('local:token', data.access_token);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-card">
      <h2>Nova Assistant</h2>
      <p className="subtitle">Sign in to your freelance dashboard</p>

      <form onSubmit={handleLogin}>
        <div className="field">
          <label>Username</label>
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="e.g. jane_doe"
            required
          />
        </div>

        <div className="field">
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default Login;