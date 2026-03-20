import { Book, Monitor, Settings } from "@mui/icons-material";
import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router";

const SidebarMenu = (): React.ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const menuItemStyle = (path: string) => ({
    margin: "8px 12px",
    borderRadius: "12px",
    padding: "12px 16px",
    transition: "all 0.3s ease",
    color: "white",
    backgroundColor: isActive(path)
      ? "rgba(255, 255, 255, 0.2)"
      : "transparent",
    "&:hover": {
      backgroundColor: isActive(path)
        ? "rgba(255, 255, 255, 0.25)"
        : "rgba(255, 255, 255, 0.1)",
      transform: "translateX(4px)",
    },
    "&::before": isActive(path)
      ? {
          content: '""',
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: "4px",
          height: "60%",
          backgroundColor: "white",
          borderRadius: "0 4px 4px 0",
        }
      : {},
  });

  return (
    <Box sx={{ width: "100%", paddingTop: 2 }}>
      <MenuList sx={{ padding: 0 }}>
        <MenuItem onClick={() => navigate("/")} sx={menuItemStyle("/")}>
          <ListItemIcon>
            <Monitor
              fontSize="small"
              sx={{ color: "white", minWidth: "40px" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            sx={{
              "& .MuiListItemText-primary": {
                fontWeight: isActive("/") ? 600 : 400,
              },
            }}
          />
        </MenuItem>
        <MenuItem
          onClick={() => navigate("/projects")}
          sx={menuItemStyle("/projects")}
        >
          <ListItemIcon>
            <Book fontSize="small" sx={{ color: "white", minWidth: "40px" }} />
          </ListItemIcon>
          <ListItemText
            primary="Daftar Proyek"
            sx={{
              "& .MuiListItemText-primary": {
                fontWeight: isActive("/projects") ? 600 : 400,
              },
            }}
          />
        </MenuItem>
        <Divider sx={{ margin: "16px 12px", borderColor: "rgba(255, 255, 255, 0.1)" }} />
        <MenuItem
          onClick={() => navigate("/settings")}
          sx={menuItemStyle("/settings")}
        >
          <ListItemIcon>
            <Settings
              fontSize="small"
              sx={{ color: "white", minWidth: "40px" }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Pengaturan"
            sx={{
              "& .MuiListItemText-primary": {
                fontWeight: isActive("/settings") ? 600 : 400,
              },
            }}
          />
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default SidebarMenu;
