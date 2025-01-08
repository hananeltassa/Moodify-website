import axios from "axios";

export const getSystemAnalytics = async (token) => {

  const response = await axios.get("http://localhost:8080/api/admin/analytics", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
  return response.data;
};
