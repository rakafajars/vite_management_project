import {
  AccountCircle,
  Notifications,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  Badge,
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import React from "react";

import Dropdown from "../../../ui/Forms/Dropdown";

interface DropdownOption {
  label: string;
  onClick: () => void;
}

const Navbar = (): React.ReactElement => {
  const options: DropdownOption[] = [
    {
      label: "Profile",
      onClick() {
        console.log("handle navigate to profile");
      },
    },
    {
      label: "Logout",
      onClick() {
        console.log("Handle logout");
      },
    },
  ];

  return (
    <Box
      sx={{
        padding: "10px 24px",
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1100,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Box sx={{ flex: 1, maxWidth: 500 }}>
          <TextField
            placeholder="Search projects, tasks..."
            size="small"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
                "&.Mui-focused": {
                  backgroundColor: "white",
                  boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
                },
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title="Notifications">
            <IconButton
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(102, 126, 234, 0.1)",
                  transform: "scale(1.05)",
                },
              }}
            >
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>

          <Dropdown icon={<AccountCircle />} options={options} />
        </Stack>
      </Stack>
    </Box>
  );
};
export default Navbar;
