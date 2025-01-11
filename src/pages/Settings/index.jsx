import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Box, Typography, Divider, Alert, Card, CardContent, TextField, Button } from "@mui/material";
import { getUserProfile, changeUserPassword } from "../../services/userService";

const Settings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getUserProfile(localStorage.getItem("authToken"));
        setProfile(user);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    try {
      const message = await changeUserPassword(
        localStorage.getItem("authToken"),
        currentPassword,
        newPassword
      );
      setPasswordSuccess(message);
      resetPasswordFields();
    } catch (err) {
      setPasswordError(err.response?.data?.error || "Error changing password.");
      setPasswordSuccess(null);
    }
  };

  const resetPasswordFields = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setShowPasswordFields(false);
    setPasswordError(null);
    setPasswordSuccess(null);
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: 3, maxWidth: "600px", mx: "auto" }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "left" }}>
          Profile Settings
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Profile Information Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            {loading && <Typography>Loading profile...</Typography>}
            {error && <Alert severity="error">{error}</Alert>}
            {profile && (
              <>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                  Admin Information
                </Typography>
                <Typography>Name: {profile.name}</Typography>
                <Typography>Email: {profile.email}</Typography>
                <Typography>Role: {profile.role}</Typography>
              </>
            )}
          </CardContent>
        </Card>

        {/* Password Change Section */}
        <Card>
          <CardContent>
            {showPasswordFields ? (
              <>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                  Change Password
                </Typography>
                {passwordError && <Alert severity="error" sx={{ mb: 2 }}>{passwordError}</Alert>}
                {passwordSuccess && <Alert severity="success" sx={{ mb: 2 }}>{passwordSuccess}</Alert>}

                <Box sx={{ display: "grid", gap: 2, mt: 2 }}>
                  <TextField
                    id="currentPassword"
                    label="Current Password"
                    variant="outlined"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    id="newPassword"
                    label="New Password"
                    variant="outlined"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    id="confirmNewPassword"
                    label="Confirm New Password"
                    variant="outlined"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    fullWidth
                  />
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                  <Button
                    variant="contained"
                    onClick={handlePasswordChange}
                    sx={{ width: "48%" }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={resetPasswordFields}
                    sx={{ width: "48%" }}
                  >
                    Cancel
                  </Button>
                </Box>
              </>
            ) : (
              <Button
                variant="outlined"
                onClick={() => setShowPasswordFields(true)}
                sx={{ width: "100%", mt: 2 }}
              >
                Change Password
              </Button>
            )}
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

export default Settings;