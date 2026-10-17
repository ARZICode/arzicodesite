import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Lock, User, Terminal } from 'lucide-react';
import './AdminLogin.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/admin/login', { username, password });
      localStorage.setItem('arzicode_token', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="admin-login-icon-box">
            <Terminal className="w-7 h-7" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>Admin Portal</h1>
          <p style={{ color: '#A7BFA6', fontSize: '0.875rem', marginTop: '0.25rem' }}>Secure system administration</p>
        </div>

        {error && <div style={{ padding: '0.875rem', borderRadius: '0.75rem', backgroundColor: 'rgba(150, 40, 40, 0.3)', border: '1px solid #7a2828', color: '#fecdd3', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#A7BFA6', marginBottom: '0.5rem' }}>Username</label>
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', left: '1rem', top: '0.95rem', width: '1.25rem', height: '1.25rem', color: '#4F7A5B' }} />
              <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="admin-input" placeholder="Admin username" />
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#A7BFA6', marginBottom: '0.5rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '1rem', top: '0.95rem', width: '1.25rem', height: '1.25rem', color: '#4F7A5B' }} />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="admin-input" placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" className="admin-submit-btn">
            Sign In to Console
          </button>
        </form>
      </div>
    </div>
  );
}