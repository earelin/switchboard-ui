import React from 'react';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import MainAppBar from "./MainAppBar";
import Box from "@mui/material/Box";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Dashboard from "./Dashboard";

const mdTheme = createTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
]);

function App() {
  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <MainAppBar />
      </Box>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <RouterProvider router={router} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
