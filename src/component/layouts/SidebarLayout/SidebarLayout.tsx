import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

// 1. Defiisikan tipe untuk satu item bradcrumb
// class breadcrumItem final string label, string href

interface BreadcrumbsItem {
  label: string;
  href: string;
}

// 2. definisikan tipe untuk props komponen ini
interface SidebarLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  breadcrumbs?: BreadcrumbsItem[];
}

//3.  Gunakan React.FC<Props> untuk menandai ini adalah function component
//    FC = FunctionComponent

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
  pageTitle = "",
  breadcrumbs = [],
}) => {
  const navigate = useNavigate();

  // 4. Return type fungsi ini secara implisit React.ReactElement
  //    Tapi kita bisa eksplisit jika mau: (): React.ReactElement => { ... }

  const renderBreadcrumbs = (): React.ReactNode[] => {
    return breadcrumbs.map((breadcrumb: BreadcrumbsItem, index: number) => {
      if (index === breadcrumbs.length - 1) {
        return (
          <Typography
            key={index}
            sx={{
              color: "text.primary",
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
          sx={{
            cursor: "pointer",
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
    <>
      <Navbar />
      <Sidebar />

      <Box
        component={"main"}
        sx={{
          marginLeft: "260px",
          marginTop: "4rem",
          paddingTop: 3,
          paddingRight: 3,
          paddingLeft: 3,
          flexGrow: 1,
          flexShrink: 0,
          position: "relative",
          backgroundColor: "#f5f7fa",
          minHeight: "100vh",
        }}
      >
        {breadcrumbs.length > 0 && (
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              mb: 2,
            }}
          >
            <Link
              underline="hover"
              color="inherit"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Home
            </Link>
            {renderBreadcrumbs()}
          </Breadcrumbs>
        )}

        {pageTitle && (
          <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {pageTitle}
            </Typography>
          </Box>
        )}
        {children}
      </Box>
    </>
  );
};

export default SidebarLayout;
