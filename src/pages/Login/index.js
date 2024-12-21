import React from 'react';
import BasicTextFields from '../../components/BasicTextFields';
import './Login.css';

function Login() {
  return (
    <div className="login-page">
      <img src="/logo-white.png" alt="Logo" className="login-logo" /> {/* Add Logo */}
      <h1>Login</h1>
      <BasicTextFields id="email" label="Email Address" variant="outlined" />
      <BasicTextFields id="password" label="Password" variant="outlined" />
    </div>
  );
}

export default Login;

