import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
  error: null,
  successMessage: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = "";
    },
    updateRole: (state, action) => {
      const { id, newRole } = action.payload;
      const user = state.users.find((user) => user.id === id);
      if (user) user.role = newRole;
    },
    toggleBan: (state, action) => {
      const { id, isBanned } = action.payload;
      const user = state.users.find((user) => user.id === id);
      if (user) {
        user.is_banned = isBanned; // Make sure this updates the state
      }
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter((user) => user.id !== userId);
    },
  },
});

export const {
  setUsers,
  setLoading,
  setError,
  setSuccessMessage,
  clearMessages,
  updateRole,
  toggleBan,
  deleteUser
} = usersSlice.actions;

export default usersSlice.reducer;
