import { Typography, TypographyProps } from "@mui/material";

interface BrandLogoTextProps extends Omit<TypographyProps, "color" | "fontSize"> {
  color?: string;
  fontSize?: string | number;
}

const BrandLogoText = ({
  color = "#003544",
  fontSize = "20px",
  ...props
}: BrandLogoTextProps) => {
  return (
    <Typography
      color={color}
      fontSize={fontSize}
      fontFamily={"Manrope, sans-serif"}
      fontWeight={"bold"}
      {...props}
    >
      Architect CV
    </Typography>
  );
};

export default BrandLogoText;
