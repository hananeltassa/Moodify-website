import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './BasicTextFields.css';

export default function BasicTextFields({ id, label, variant }) {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '40ch' } }}
      noValidate
      autoComplete="off"
      className="basic-text-fields"
    >
      <TextField id={id} label={label} variant={variant} />
    </Box>
  );
}
