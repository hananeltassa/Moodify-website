import axios from "axios";

export const getSystemAnalytics = async (token) => {

  const response = await axios.get("http://localhost:8080/api/admin/analytics", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
  return response.data;
};


export const fetchUserGrowthData = async (token) => {
  try {
    const response = await axios.get("http://localhost:8080/api/admin/user-growth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.userGrowth;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error fetching user growth data");
  }
};


export const getMoodAndInputTypeStats = async (token) => {
  const response = await axios.get(`http://localhost:8080/api/admin/mood-stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
