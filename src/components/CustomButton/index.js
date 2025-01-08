import React from "react";
import Button from "@mui/material/Button";

const CustomButton = ({ variant = "contained", children, onClick, disabled }) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      sx={{
        backgroundColor: variant === "contained" ? "primary.main" : undefined,
        borderRadius: 15,
        width: 200,
        textTransform: "none",
        paddingX: 3,
        paddingY: 1.5,
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: variant === "contained" ? "primary.dark" : undefined,
        },
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
