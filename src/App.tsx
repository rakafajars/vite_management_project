import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router";

import Login from "./components/pages/Auth/Login";
import Dashboard from "./components/pages/Dashboard";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PengalamanKerja from "./components/pages/WorkExperience";
import Settings from "./components/pages/Settings";
import Register from "./components/pages/Auth/Register";
import sidebarLoader from "./components/layouts/SidebarLayout/SidebarLayout.loader";
import authLoader from "./components/pages/Auth/Auth.loader";

const theme = createTheme({
  typography: {
    fontFamily: ["Manrope", "sans-serif"].join(","),
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    loader: sidebarLoader,
  },
  {
    path: "/login",
    element: <Login />,
    loader: authLoader,
  },
  {
    path: "/pengalaman-kerja",
    element: <PengalamanKerja />,
    loader: sidebarLoader,
  },
  {
    path: "/settings",
    element: <Settings />,
    loader: sidebarLoader,
  },
  {
    path: "/register",
    element: <Register />,
    loader: authLoader,
  },
]);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
