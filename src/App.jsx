import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { createBrowserRouter, RouterProvider, Link } from "react-router";
import Table from "./component/ui/Table";
import Pagination from "./component/ui/Pagination";

const theme = createTheme({
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Box>
        <Table
          coloumns={[
            {
              id: "tugas",
              label: "Tugas",
            },
            {
              id: "status",
              label: "Status",
            },
          ]}
          data={[
            {
              id: 1,
              tugas: "Tugas 1",
              status: "Baru aa",
            },
            {
              id: 2,
              tugas: "Tugas 1",
              status: "Baru 1123",
            },
            {
              id: 3,
              tugas: "Tugas 1",
              status: "Baru aa",
            },
          ]}
        />
        <Pagination
          count={10}
          onChange={(event, page) => {
            console.log("page", page);
          }}
        />
      </Box>
    ),
  },
  // {
  //   path: "/login",
  //   element: (
  //     <Box>
  //       <Typography variant="h1">Login</Typography>
  //       <Link to="/">Kembali ke Home</Link>
  //     </Box>
  //   ),
  // },
]);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
