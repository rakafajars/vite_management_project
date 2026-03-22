import { Box } from "@mui/material";
import SidebarMenu from "./SidebarMenu";
import React from "react";
import Avatar from "../../../ui/Avatar";

const Sidebar = (): React.ReactElement => {
  return (
    <Box
      component={"aside"}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "240px",
        height: "100vh",
        flexGrow: 0,
        flexShrink: 0,
        borderRight: "1px solid #ccc",
        zIndex: 1000,
        paddingTop: "4rem",
        background: "#ffffff",
      }}
    >
      <SidebarMenu />
    </Box>
  );
};

export default Sidebar;
