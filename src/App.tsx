import React from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import MainAppBar from './MainAppBar';
import Box from '@mui/material/Box';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import ProjectList from './projects/ProjectList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProjectShow from './projects/ProjectShow';

const mdTheme = createTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/projects',
    element: <ProjectList />,
  },
  {
    path: '/projects/:projectKey',
    element: <ProjectShow />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
