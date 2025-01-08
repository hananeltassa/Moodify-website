import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import useSplashScreen from "./hooks/useSplashScreen";
import ThemeContextProvider from "./context/ThemeContext";
import "./styles/styles.css";

function App() {
  const isLoading = useSplashScreen(2000); 

  if (isLoading) return <SplashScreen />;

  return (
    <ThemeContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;