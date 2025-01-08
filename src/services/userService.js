import axios from "axios";

export const getAllUsers = async (token) => {
  try {
    const response = await axios.get("http://localhost:8080/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error(
      error.response?.data?.error || "Error fetching users. Please try again."
    );
  }
};
