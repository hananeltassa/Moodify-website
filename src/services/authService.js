import axios from "axios";

export const loginUser = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });
  
      if (response.status === 200) {
        const { token, user } = response.data;
  
        if (!user.role) {
          throw new Error("No role information found. Please contact support.");
        }
  
        if (user.role !== "admin") {
          throw new Error("Access denied. Only admins can log in.");
        }
  
        return { token, user };
      }
    } catch (err) {
      if (err.response && err.response.data) {
        throw new Error(err.response.data.error);
      } else {
        throw new Error("An unexpected error occurred. Please try again.");
      }
    }
  };
  