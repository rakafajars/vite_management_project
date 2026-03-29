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
import { useNavigate } from "react-router";

const SidebarMenu = (): React.ReactElement => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%", paddingTop: 1 }}>
      <MenuList>
        <MenuItem
          onClick={() => navigate("/")}
          sx={{
            position: "relative",
          }}
        >
          <ListItemIcon>
            <Monitor fontSize="small" />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => navigate("/pengalaman-kerja")}
          sx={{
            position: "relative",
          }}
        >
          <ListItemIcon>
            <Book fontSize="small" />
          </ListItemIcon>
          <ListItemText>Pengalaman Kerja</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate("/settings")}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Pengaturan</ListItemText>
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default SidebarMenu;
