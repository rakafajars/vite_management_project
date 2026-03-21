import { Box } from "@mui/material";
import LoginLeftPanel from "../layout/LoginLeftPanel";
import LoginRightPanel from "../layout/LoginRightPanel";

const Login = () => {
  return (
    <Box display={"flex"} flexDirection={"row"} height={"100vh"}>
      <LoginLeftPanel />
      <LoginRightPanel />
    </Box>
  );
};

export default Login;
