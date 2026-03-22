import { Box, Typography } from "@mui/material";
import BrandLogoText from "../../../ui/BrandLogoText";

const LoginLeftPanel = (): React.ReactElement => {
  return (
    <Box
      flex={1}
      bgcolor={"#003544"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      p={"48px"}
    >
      <Box flexDirection={"row"} display={"flex"} alignItems={"center"} gap={1}>
        <img src="/src/assets/ic_architect_cv.svg" height={24} width={16} />
        <BrandLogoText color="white" fontSize={24} />
      </Box>

      <Box flexDirection={"column"} display={"flex"} gap={2}>
        <Typography
          color="white"
          fontWeight={"bold"}
          fontSize={48}
          fontFamily={"Manrope, sans-serif"}
        >
          The Editorial Approach to Career Design.
        </Typography>
        <Typography
          color="white"
          fontSize={18}
          fontFamily={"Inter, sans-serif"}
          fontWeight={500}
        >
          Craft your professional narrative using our curated architectural
          framework.
        </Typography>
      </Box>

      <Box
        borderRadius={"8px"}
        paddingX={"16px"}
        paddingY={"8px"}
        sx={{
          display: "inline-flex",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(4px)",
          alignSelf: "flex-start",
        }}
      >
        <Typography
          color="#95CFE7"
          fontSize={14}
          fontFamily={"Inter, sans-serif"}
          fontWeight={500}
        >
          v2.4 Ready
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginLeftPanel;
