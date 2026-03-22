import { AppBar, Box, Paper, Typography } from "@mui/material";
import BrandLogoText from "../../../ui/BrandLogoText";
import RegisterLeftPanel from "./RegisterLeftPanel";
import RegisterRightPanel from "./RegisterRightPanel";

const Register = () => {
  return (
    <Box
      bgcolor={"#F8F9FA"}
      minHeight={"100vh"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Box
        position={"absolute"}
        bottom={24}
        right={24}
        borderRadius={"12px"}
        paddingX={"24px"}
        paddingY={"12px"}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"12px"}
        sx={{
          backgroundColor: "rgba(248, 249, 250, 0.8)",
          border: "1px solid rgba(192, 200, 204, 0.15)",
          backdropFilter: "blur(4px)",
        }}
      >
        <Box
          height={"10px"}
          width={"10px"}
          bgcolor={"#003544"}
          borderRadius={100}
        />
        <Typography
          fontFamily={"Inter, sans-serif"}
          sx={{
            fontSize: "12px",
            fontWeight: "medium",
            color: "#003544",
            letterSpacing: "1.2px",
          }}
        >
          ENCRYPTED DRAFT MODE
        </Typography>
      </Box>
      <AppBar
        sx={{
          bgcolor: "#F8F9FA",
          boxShadow: 0,
          padding: "32px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
        position="static"
      >
        <BrandLogoText color="#003544" fontSize={"20px"} />
        <Box
          display={"flex"}
          flexDirection={"row"}
          flex={1}
          alignItems={"center"}
        >
          <RegisterLeftPanel />

          <RegisterRightPanel />
        </Box>

        <Box></Box>
      </AppBar>
    </Box>
  );
};

export default Register;
