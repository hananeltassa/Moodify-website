import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import SplashScreen from "./components/SplashScreen";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import useSplashScreen from "./hooks/useSplashScreen";
import ThemeContextProvider from "./context/ThemeContext";
import "./styles/styles.css";

function App() {
  const isLoading = useSplashScreen(2000);

  if (isLoading) return <SplashScreen />;

  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </ThemeContextProvider>
    </Provider>
  );
}

export default App;