import { useState } from 'react';
import { useAuth } from '../components/AuthContext'; // Ensure correct path
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
  const { isAuthenticated, setUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: username,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data.userId);
      localStorage.setItem('token', data.token);

      // Show success message
      setSuccessMessage('User successfully logged in!');

      // Redirect after a short delay
      setTimeout(() => {
        navigate('/choice');
      }, 2000); // Redirect after 2 seconds
    } else {
      setError('Invalid credentials');
    }
  };

  if (isAuthenticated) {
    return <div>You're already logged in!</div>;
  }

  return (
    <div className="login-container">
      <h1>Login</h1>

      {successMessage && <div className="success-alert">{successMessage}</div>}
      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isAuthenticated}
          className="input"
        />
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isAuthenticated}
            className="input"
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button type="submit" disabled={isAuthenticated} className="button">
          Login
        </button>
      </form>

      <p className="signup-text">
        New user? <Link to="/signup" className="signup-link">Sign Up Here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
