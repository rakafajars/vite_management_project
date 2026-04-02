import { Box, Breadcrumbs, Link, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { ROUTES } from "@/constants/routes";

const SIDEBAR_WIDTH = 280; // Diperlebar sedikit agar lebih premium

interface BreadcrumbsItem {
  label: string;
  href: string;
}

interface SidebarLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  breadcrumbs?: BreadcrumbsItem[];
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
  pageTitle = "",
  breadcrumbs = [],
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg")); // Breakpoint dinaikkan ke lg (1200px)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => setSidebarOpen((prev) => !prev);
  const handleCloseSidebar = () => setSidebarOpen(false);

  const renderBreadcrumbs = (): React.ReactNode[] => {
    return breadcrumbs.map((breadcrumb: BreadcrumbsItem, index: number) => {
      if (index === breadcrumbs.length - 1) {
        return (
          <Typography
            key={index}
            variant="body2"
            sx={{
              color: "text.primary",
              fontWeight: 600,
            }}
          >
            {breadcrumb.label}
          </Typography>
        );
      }

      return (
        <Link
          key={index}
          underline="hover"
          color="inherit"
          variant="body2"
          sx={{
            cursor: "pointer",
            opacity: 0.7,
            "&:hover": { opacity: 1 },
          }}
          onClick={() => {
            navigate(breadcrumb.href);
          }}
        >
          {breadcrumb.label}
        </Link>
      );
    });
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <Navbar onToggleSidebar={handleToggleSidebar} sidebarWidth={SIDEBAR_WIDTH} />
      <Sidebar
        open={sidebarOpen}
        onClose={handleCloseSidebar}
        isMobile={isMobile}
        sidebarWidth={SIDEBAR_WIDTH}
      />

      <Box
        component={"main"}
        sx={{
          marginLeft: isMobile ? 0 : `${SIDEBAR_WIDTH}px`,
          marginTop: "64px", // Sesuai tinggi navbar
          paddingTop: { xs: 3, sm: 4 },
          paddingRight: { xs: 2.5, sm: 4 },
          paddingLeft: { xs: 2.5, sm: 4 },
          paddingBottom: { xs: 3, sm: 4 },
          flexGrow: 1,
          flexShrink: 0,
          position: "relative",
          transition: theme.transitions.create("margin-left", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: isMobile ? "100%" : `calc(100% - ${SIDEBAR_WIDTH}px)`,
        }}
      >
        <Box sx={{ maxWidth: 1200, margin: "0 auto" }}>
          {breadcrumbs.length > 0 && (
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{
                mb: 2.5,
                "& .MuiBreadcrumbs-separator": { opacity: 0.5 },
              }}
            >
              <Link
                underline="hover"
                color="inherit"
                variant="body2"
                sx={{ cursor: "pointer", opacity: 0.7, "&:hover": { opacity: 1 } }}
                onClick={() => navigate(ROUTES.DASHBOARD)}
              >
                Home
              </Link>
              {renderBreadcrumbs()}
            </Breadcrumbs>
          )}

          {pageTitle && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                fontWeight={800}
                color="#003544"
                sx={{
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
                  letterSpacing: "-0.02em",
                }}
              >
                {pageTitle}
              </Typography>
            </Box>
          )}

          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarLayout;
