import {
  Checkbox as BaseCheckbox,
  FormControlLabel,
  Typography,
  SxProps,
  Theme,
} from "@mui/material";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface CustomCheckboxProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  paddingTop?: string | number;
  sx?: SxProps<Theme>;
}

const Checkbox = <T extends FieldValues>({
  control,
  name,
  label,
  paddingTop = "32px",
  sx,
}: CustomCheckboxProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...field } }) => (
        <FormControlLabel
          sx={{
            paddingTop: paddingTop,
            gap: "8px",
            margin: 0,
            "& .MuiFormControlLabel-label": {
              margin: 0,
            },
            ...sx,
          }}
          control={
            <BaseCheckbox
              {...field}
              checked={!!value}
              onChange={(e) => onChange(e.target.checked)}
              sx={{
                padding: "0",
                color: "#E7E8E9",
                "& .MuiSvgIcon-root": {
                  fontSize: 20,
                  color: "#E7E8E9",
                },
                "&.Mui-checked .MuiSvgIcon-root": {
                  color: "#003544",
                },
              }}
            />
          }
          label={
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                color: "#4C616C",
              }}
            >
              {label}
            </Typography>
          }
        />
      )}
    />
  );
};

export default Checkbox;
