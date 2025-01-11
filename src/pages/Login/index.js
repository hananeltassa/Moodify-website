import React, { useState } from "react";
import BasicTextFields from "../../components/BasicTextFields";
import { Button, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../services/authService"; 
import { setAuth } from "../../redux/slices/authSlice"; 
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const { token, user } = await loginUser(email, password);

      localStorage.setItem("authToken", token);
      dispatch(setAuth({ user }));

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <img src="/logo-white.png" alt="Logo" className="login-logo" />
      <h1>Login</h1>
      {error && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}
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