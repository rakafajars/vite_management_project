import { Box, Typography } from "@mui/material";
import FeatureItem from "./FeatureItem";

const RegisterLeftPanel = () => {
  return (
    <Box flex={1} paddingRight={"32px"}>
      <Typography
        fontSize={"56px"}
        color="#003544"
        fontWeight={"bold"}
        mb={"16px"}
      >
        Build your legacy.
      </Typography>
      <Typography
        fontSize={"19px"}
        color="#4C616C"
        fontWeight={"regular"}
        fontFamily={"Inter"}
        mb={"40px"}
      >
        We treat your career history not as data points, but as a curated story.
        Step into an editorial experience designed for modern professionals.
      </Typography>

      <Box display={"flex"} flexDirection={"column"}>
        <FeatureItem
          title="Architectural Precision"
          description="Clean, asymmetrical layouts that command attention."
        />
        <FeatureItem
          title="Live Editorial View"
          description="See your profile transform in real-time as you draft."
        />
      </Box>
    </Box>
  );
};

export default RegisterLeftPanel;
