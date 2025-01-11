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

export const toggleUserBan = async (token, userId) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/admin/users/${userId}/ban`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in toggleUserBan:", error);
    // Extract error message from response
    const errorMessage = error.response?.data?.message || "An error occurred while banning the user.";
    throw new Error(errorMessage);
  }
};

export const deleteUser = async (token, id) => {
  const response = await axios.delete(`http://localhost:8080/api/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getUserProfile = async (authToken) => {
  const response = await axios.get(`http://localhost:8080/api/users/profile`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return response.data.user;
};

export const changeUserPassword = async (authToken, currentPassword, newPassword) => {
  const response = await axios.put(`http://localhost:8080/api/users/change-password`,
    { currentPassword, newPassword },
    {
      headers: { Authorization: `Bearer ${authToken}` },
    }
  );
  return response.data.message;
};