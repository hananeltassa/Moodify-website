import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Login from "./pages/Login";
import useSplashScreen from "./hooks/useSplashScreen"; 
import "./styles/styles.css";

function App() {
  const isLoading = useSplashScreen(2000); 

  if (isLoading) return <SplashScreen />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;