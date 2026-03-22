import { Box, Typography } from "@mui/material";

interface FeatureItemProps {
  title: string;
  description: string;
  iconSrc?: string;
}

const FeatureItem = ({
  title,
  description,
  iconSrc = "/src/assets/ic_architect_cv.svg",
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
        paddingX={"14px"}
        paddingY={"11px"}
        alignItems={"center"}
        justifyContent={"center"}
        display={"flex"}
      >
        <img src={iconSrc} height={24} width={24} alt={title} />
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
