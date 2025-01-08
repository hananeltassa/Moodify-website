import axios from "axios";

const normalizeRole = (role) => role.toLowerCase();

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

export const updateUserRole = async (token, id, role) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/admin/users/${id}/role`,
        { role: normalizeRole(role) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user role:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || "Failed to update user role");
    }
};