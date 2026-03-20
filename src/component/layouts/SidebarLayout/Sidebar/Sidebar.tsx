import { Box, Typography } from "@mui/material";
import React from "react";

import SidebarMenu from "./SidebarMenu";

const Sidebar = (): React.ReactElement => {
  return (
    <Box
      component={"aside"}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "260px",
        height: "100vh",
        flexGrow: 0,
        flexShrink: 0,
        zIndex: 1000,
        paddingTop: "4rem",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        boxShadow: "4px 0 24px rgba(0, 0, 0, 0.12)",
        transition: "all 0.3s ease",
      }}
    >
      <Box
        sx={{
          padding: 3,
          paddingBottom: 2,
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: 700,
            letterSpacing: "0.5px",
            textAlign: "center",
          }}
        >
          Project Manager
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            display: "block",
            textAlign: "center",
            marginTop: 0.5,
          }}
        >
          Manage your projects
        </Typography>
      </Box>
      <SidebarMenu />
    </Box>
  );
};

export default Sidebar;
