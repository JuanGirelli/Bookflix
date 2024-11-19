import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{ type: string; message: string; navigate?: boolean } | null>(
    null
  );
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({ type: 'danger', message: 'Password must be at least 6 characters long.' });
      return;
    }

    if (password !== confirmPassword) {
      setAlert({ type: 'danger', message: 'Passwords do not match.' });
      return;
    }

    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message === 'User already exists') {
          setAlert({
            type: 'warning',
            message: 'User already exists. Kindly login.',
            navigate: true,
          });
        } else {
          throw new Error(data.message || 'Signup failed.');
        }
        return;
      }

      setAlert({ type: 'success', message: 'Registered successfully!' });

      // Redirect to login page after success
      setTimeout(() => navigate('/'), 2000);
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
      <h2>Signup</h2>
      {alert && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}{' '}
          {alert.navigate && (
            <span
              style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => navigate('/')}
            >
              Login here
            </span>
          )}
        </div>
      )}
      <form onSubmit={handleRegister} className="form-container">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
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
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;