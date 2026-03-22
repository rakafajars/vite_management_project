import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router";

import Login from "./component/pages/Auth/Login";
import Dashboard from "./component/pages/Dashboard";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DetailProject from "./component/pages/Project/DetailProject";
import Settings from "./component/pages/Settings";
import Register from "./component/pages/Auth/Register";

const theme = createTheme({
  typography: {
    fontFamily: ["Manrope", "sans-serif"].join(","),
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  //   element: (
  //     <Box>
  //       <Table
  //         coloumns={[
  //           {
  //             id: "tugas",
  //             label: "Tugas",
  //           },
  //           {
  //             id: "status",
  //             label: "Status",
  //           },
  //         ]}
  //         data={[
  //           {
  //             id: 1,
  //             tugas: "Tugas 1",
  //             status: "Baru aa",
  //           },
  //           {
  //             id: 2,
  //             tugas: "Tugas 1",
  //             status: "Baru 1123",
  //           },
  //           {
  //             id: 3,
  //             tugas: "Tugas 1",
  //             status: "Baru aa",
  //           },
  //         ]}
  //       />
  //       <Pagination
  //         count={10}
  //         onChange={(event, page) => {
  //           console.log("page", page);
  //         }}
  //       />
  //     </Box>
  //   ),
  // },
  // {
  //   path: "/login",
  //   element: (
  //     <Box>
  //       <Typography variant="h1">Login</Typography>
  //       <Link to="/">Kembali ke Home</Link>
  //     </Box>
  //   ),
  // },

  {
    path: "/login",
    element: <Login />,
  },
  {
    // path: "/projects/:id",
    path: "/projects",
    element: <DetailProject />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/register",
    element: <Register />,
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
