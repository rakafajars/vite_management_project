import { Box, Typography } from "@mui/material";

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureItem = ({ icon, title, description }: FeatureItemProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: { xs: 2, md: 2.5 },
      }}
    >
      {/* Icon Box */}
      <Box
        sx={{
          flexShrink: 0,
          width: { xs: 44, md: 48 },
          height: { xs: 44, md: 48 },
          backgroundColor: "#CFE6F2",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Manrope, sans-serif",
            fontSize: { xs: "18px", md: "20px" },
            fontWeight: 700,
            color: "#003544",
          }}
        >
          {icon}
        </Typography>
      </Box>

      {/* Text Content */}
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontFamily: "Manrope, sans-serif",
            fontSize: { xs: "15px", md: "16px" },
            fontWeight: 700,
            color: "#003544",
            mb: 0.5,
            lineHeight: 1.4,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Inter, sans-serif",
            fontSize: { xs: "13px", md: "14px" },
            fontWeight: 400,
            color: "#526772",
            lineHeight: 1.5,
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default FeatureItem;
