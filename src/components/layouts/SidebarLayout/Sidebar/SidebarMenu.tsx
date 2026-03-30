import { AccountTree, Book, Monitor, Settings, WorkOutline, WorkOutlineOutlined } from "@mui/icons-material";
import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router";

interface SidebarMenuProps {
  onItemClick?: () => void;
}

const SidebarMenu = ({ onItemClick }: SidebarMenuProps): React.ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    onItemClick?.();
  };

  const navItems = [
    { label: "Dashboard", path: "/", icon: <Monitor fontSize="small" /> },
    {
      label: "Pengalaman Kerja",
      path: "/pengalaman-kerja",
      icon: <Book fontSize="small" />,
    },
    {
      label: "Skills",
      path: "/skills",
      icon: <WorkOutline fontSize="small" />
    }, {
      label: "Project",
      path: "/project",
      icon: <AccountTree fontSize="small" />
    },
    { label: "Pengaturan", path: "/settings", icon: <Settings fontSize="small" /> },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="overline"
        sx={{
          px: 2,
          mb: 1,
          display: "block",
          fontWeight: 700,
          color: "text.disabled",
          letterSpacing: 1.2,
        }}
      >
        MENU UTAMA
      </Typography>

      <MenuList sx={{ p: 0 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <MenuItem
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              sx={{
                position: "relative",
                borderRadius: 2,
                mb: 0.5,
                color: isActive ? "#003544" : "text.secondary",
                bgcolor: isActive ? "rgba(0, 53, 68, 0.08)" : "transparent",
                fontWeight: isActive ? 700 : 500,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  bgcolor: isActive
                    ? "rgba(0, 53, 68, 0.12)"
                    : "rgba(145, 158, 171, 0.08)",
                  color: isActive ? "#003544" : "text.primary",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? "#003544" : "text.secondary",
                  minWidth: 36,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "0.875rem",
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {item.label}
              </ListItemText>
            </MenuItem>
          );
        })}
      </MenuList>
    </Box>
  );
};

export default SidebarMenu;
