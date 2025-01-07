import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ThemeProviderComponent = ({ children, mode }) => {
  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#FF6100",
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderComponent;
