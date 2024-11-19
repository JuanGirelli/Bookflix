import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login: React.FC = () => {
  const [userIdOrEmail, setUserIdOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userIdOrEmail,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed.');
      }

      const { token } = await response.json();
      
      // Store token securely in localStorage
      localStorage.setItem('token', token);

      setAlert({ type: 'success', message: 'Logged in successfully!' });

      // Navigate to the ChoicePage after a short delay
      setTimeout(() => {
        setAlert(null);
        navigate('/choice');
      }, 1000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setAlert({ type: 'danger', message: error.message });
      } else {
        setAlert({ type: 'danger', message: 'An unknown error occurred.' });
      }
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {alert && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}
      <form onSubmit={handleLogin} className="form-container">
        <div className="form-group">
          <label htmlFor="userIdOrEmail">User ID:</label>
          <input
            type="text"
            id="userIdOrEmail"
            value={userIdOrEmail}
            onChange={(e) => setUserIdOrEmail(e.target.value)}
            placeholder="Enter your User ID"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle-icon"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <p>
        Forgot your password?{' '}
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => navigate('/forgot-password')}
        >
          Reset it here
        </span>
      </p>
      <p>
        New user?{' '}
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
