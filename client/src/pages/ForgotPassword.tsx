// src/pages/ForgotPassword.tsx
import React, { useState } from 'react';
import { apiRequest } from '../utils/apiRequest';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiRequest('/auth/forgot-password', 'POST', { email });
      if (response.success) {
        setMessage('Password reset instructions have been sent to your email.');
      } else {
        throw new Error(response.message || 'Unable to reset password.');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p className="info">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
