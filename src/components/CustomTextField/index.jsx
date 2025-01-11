import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const CustomTextField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  fullWidth = true,
  variant = "outlined",
  showPasswordToggle = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleToggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      id={id}
      label={label}
      variant={variant}
      type={type === "password" && !showPassword ? "password" : "text"}
      value={value}
      onChange={onChange}
      fullWidth={fullWidth}
      InputProps={
        showPasswordToggle && type === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : null
      }
      {...props}
    />
  );
};

export default CustomTextField;