import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });

      console.log("Login response:", response.data);

      if (response.status === 200) {
        const { token, user } = response.data;

        if (!user.role) {
          setError("No role information found. Please contact support.");
          setLoading(false);
          return;
        }

        if (user.role !== "admin") {
          setError("Access denied. Only admins can log in.");
          setLoading(false);
          return;
        }
        //console.log(user.role);

        localStorage.setItem("authToken", token);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err); // Debugging
      if (err.response && err.response.data) {
        setError(err.response.data.error);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;
