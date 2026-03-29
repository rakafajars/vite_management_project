import {
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  ButtonBase,
  Avatar,
  Badge,
} from "@mui/material";
import React from "react";
import Dropdown from "../../../ui/Forms/Dropdown";
import {
  Menu as MenuIcon,
  NotificationsNone as NotificationsIcon,
  AutoAwesome as AutoAwesomeIcon,
} from "@mui/icons-material";
import session from "@/utils/session";
import { useNavigate } from "react-router";

interface DropdownOption {
  label: string;
  onClick: () => void;
}

interface NavbarProps {
  onToggleSidebar: () => void;
  sidebarWidth?: number;
}

const Navbar = ({
  onToggleSidebar,
  sidebarWidth = 240,
}: NavbarProps): React.ReactElement => {
  const navigate = useNavigate();
  const theme = useTheme();
  // Karena di layout kita set lg sbg mobile/drawer, di sini juga samakan lg
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const options: DropdownOption[] = [
    {
      label: "My Profile",
      onClick() {
        console.log("handle navigate to profile");
      },
    },
    {
      label: "Account Settings",
      onClick() {
        navigate("/settings");
      },
    },
    {
      label: "Sign Out",
      onClick() {
        session.clearSession();
        navigate("/login");
      },
    },
  ];

  // Custom User Avatar Dropdown trigger
  const userTrigger = (
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 1 }}>
      <Box sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}>
        <Typography variant="subtitle2" fontWeight={700} color="#003544">
          John Doe
        </Typography>
        <Typography variant="caption" color="text.secondary" fontWeight={500}>
          Architect
        </Typography>
      </Box>
      <Avatar
        src="https://avatar.iran.liara.run/public/12"
        sx={{ width: 40, height: 40, border: "2px solid #e3f2fd" }}
      />
    </Stack>
  );

  return (
    <Box
      component="header"
      sx={{
        height: 64,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0, // Navbar membentang full
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        zIndex: theme.zIndex.drawer + 50, // di atas drawer (jika kita mau full w idth nav)
        display: "flex",
        alignItems: "center",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%", px: { xs: 2, sm: 3 } }}
      >
        {/* LEFT SECTION (Logo & Hamburger) */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ width: sidebarWidth }}>
          {isMobile && (
            <IconButton
              onClick={onToggleSidebar}
              edge="start"
              sx={{
                color: "#003544",
                bgcolor: "rgba(0,53,68,0.04)",
                "&:hover": { bgcolor: "rgba(0,53,68,0.08)" },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Branding Logo - Hanya tampil di desktop atau jika drawer nutup */}
          <ButtonBase
            disableRipple
            onClick={() => navigate("/")}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                background: "linear-gradient(135deg, #003544 0%, #0077B6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                boxShadow: "0 4px 10px rgba(0, 119, 182, 0.3)",
              }}
            >
              <AutoAwesomeIcon fontSize="small" />
            </Box>
            <Typography
              variant="h6"
              fontWeight={800}
              sx={{
                background: "linear-gradient(135deg, #003544 0%, #0077B6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.03em",
                display: { xs: "none", sm: "block" }
              }}
            >
              CV BUILDER
            </Typography>
          </ButtonBase>
        </Stack>

        {/* RIGHT SECTION */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            sx={{
              color: "text.secondary",
              "&:hover": { color: "#003544", bgcolor: "rgba(0,53,68,0.04)" },
            }}
          >
            <Badge color="error" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Box sx={{ width: "1px", height: 24, bgcolor: "divider", mx: 1 }} />

          <Dropdown icon={userTrigger} options={options} />
        </Stack>
      </Stack>
    </Box>
  );
};
export default Navbar;
