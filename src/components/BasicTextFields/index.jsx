import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './BasicTextFields.css';

export default function BasicTextFields({ id, label, variant, type = "text", value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '40ch' } }}
      noValidate
      autoComplete="off"
      className="basic-text-fields"
    >
      <TextField
        id={id}
        label={label}
        variant={variant}
        type={type === "password" && !showPassword ? "password" : "text"}
        value={value}
        onChange={onChange}
        InputProps={
          type === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggleVisibility} edge="end">
                      {showPassword ? (
                        <VisibilityOff sx={{ color: 'white' }} />
                      ) : (
                        <Visibility sx={{ color: 'white' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Box>
  );
}
