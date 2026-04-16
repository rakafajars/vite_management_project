import { Box, Drawer } from "@mui/material";
import SidebarMenu from "./SidebarMenu";
import React from "react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
  sidebarWidth?: number;
}

const Sidebar = ({
  open,
  onClose,
  isMobile,
  sidebarWidth = 240,
}: SidebarProps): React.ReactElement => {
  const sidebarContent = (
    <Box sx={{ width: sidebarWidth, paddingTop: isMobile ? 3 : "5rem", px: 2 }}>
      <SidebarMenu onItemClick={isMobile ? onClose : undefined} />
    </Box>
  );

  // Mobile: Temporary Drawer (slide dari kiri)
  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 60,
          "& .MuiDrawer-paper": {
            width: sidebarWidth,
            borderRight: "none",
            background: "#ffffff",
            boxShadow: "4px 0 24px rgba(0,0,0,0.06)",
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    );
  }

  // Desktop: sidebar tetap permanent
  return (
    <Box
      component={"aside"}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${sidebarWidth}px`,
        height: "100vh",
        flexGrow: 0,
        flexShrink: 0,
        borderRight: "1px dashed rgba(145, 158, 171, 0.24)", // Border sangat halus khas dashboard modern
        zIndex: 1000,
        paddingTop: "64px", // height navbar
        background: "#ffffff",
        transition: "width 0.3s ease",
      }}
    >
      <Box sx={{ width: "100%", height: "100%", overflowY: "auto", px: 2, pt: 3 }}>
        <SidebarMenu />
      </Box>
    </Box>
  );
};

export default Sidebar;
