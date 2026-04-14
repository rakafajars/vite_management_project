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
import Skills from "./components/pages/Skills";
import Project from "./components/pages/Project";
import Education from "./components/pages/Education";
import CreateUpdateProject from "./components/pages/Project/CreateUpdateProject";
import { Toaster } from "react-hot-toast";
import CreateUpdateSkill from "./components/pages/Skills/CreateUpdateSkill";
import { ROUTES } from "./constants/routes";
import CreateUpdateEducation from "./components/pages/Education/CreateUpdateEducation";
import CreateUpdateWorkExperience from "./components/pages/WorkExperience/CreateUpdateWorkExperience";

const theme = createTheme({
  typography: {
    fontFamily: ["Manrope", "sans-serif"].join(","),
  },
});

const router = createBrowserRouter([
  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />,
    loader: sidebarLoader,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
    loader: authLoader,
  },
  {
    path: ROUTES.WORK_EXPERIENCE,
    element: <PengalamanKerja />,
    loader: sidebarLoader,
  },
  {
    path: ROUTES.CREATE_UPDATE_WORK_EXPERIENCE,
    element: <CreateUpdateWorkExperience />,
    loader: sidebarLoader,
  },
  {
    path: ROUTES.SKILLS,
    element: <Skills />,
    loader: sidebarLoader,
  },
  {
    path: ROUTES.CREATE_UPDATE_SKILL,
    element: <CreateUpdateSkill />,
    loader: sidebarLoader,
  },
  {
    path: ROUTES.PROJECT,
    element: <Project />,
    loader: sidebarLoader,
  },
  {
    path: ROUTES.CREATE_UPDATE_PROJECT,
    element: <CreateUpdateProject />,
    loader: sidebarLoader,
  },
  {
    path: ROUTES.EDUCATION,
    element: <Education />,
    loader: sidebarLoader,
  },
  {
    path: ROUTES.CREATE_UPDATE_EDUCATION,
    element: <CreateUpdateEducation />,
    loader: sidebarLoader,
  },
  {
    path: ROUTES.SETTINGS,
    element: <Settings />,
    loader: sidebarLoader,
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
    loader: authLoader,
  },
]);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Toaster position="top-right" reverseOrder={false} />
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
