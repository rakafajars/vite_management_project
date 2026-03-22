import { Box, Typography } from "@mui/material";

interface FeatureItemProps {
  title: string;
  description: string;
  icon?: string;
}

const FeatureItem = ({
  title,
  description,
  icon = "A",
}: FeatureItemProps) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      gap={"16px"}
      mb={"24px"}
    >
      <Box
        height={"40px"}
        width={"40px"}
        borderRadius={"8px"}
        sx={{
          backgroundColor: "#CFE6F2",
        }}
        alignItems={"center"}
        justifyContent={"center"}
        display={"flex"}
      >
        <Typography
          fontSize={"18px"}
          fontWeight={"bold"}
          color="#003544"
          fontFamily={"Manrope, sans-serif"}
        >
          {icon}
        </Typography>
      </Box>
      <Box>
        <Typography fontSize={"16px"} color="#003544" fontWeight={"bold"}>
          {title}
        </Typography>
        <Typography
          fontSize={"14px"}
          color="#526772"
          fontWeight={"regular"}
          fontFamily={"Inter"}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default FeatureItem;
