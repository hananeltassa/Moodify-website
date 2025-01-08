import React, { useState } from "react";
import BasicTextFields from "../../components/BasicTextFields";
import { Button, Typography, CircularProgress } from "@mui/material";
import useLogin from "../../hooks/useLogin";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin();

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <div className="login-page">
      <img src="/logo-white.png" alt="Logo" className="login-logo" />
      <h1>Login</h1>
      {error && <Typography color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}
      <BasicTextFields
        id="email"
        label="Email Address"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <BasicTextFields
        id="password"
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        disabled={loading}
        sx={{
          marginTop: 3,
          paddingX: 4,
          paddingY: 1,
          fontWeight: "bold",
          borderRadius: 10,
          textTransform: "none",
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
      </Button>
    </div>
  );
}

export default Login;
