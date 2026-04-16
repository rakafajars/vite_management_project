import {
  TextField as BaseTextField,
  Box,
  TextFieldProps,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { useEffect, useState } from "react";

// 1. Definisikan Interface Props dengan Generic <T>
// Kita mewarisi TextFieldProps dari MUI agar semua fitur asli (seperti type="password") tetap ada.
interface CustomTextFieldProps<T extends FieldValues> extends Omit<
  TextFieldProps,
  "name" | "label"
> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  defaultValue?: any;
  rightLabel?: React.ReactNode;
  marginBottom?: string | number;
}

const TextField = <T extends FieldValues>({
  control,
  name,
  label,
  defaultValue = "",
  helperText = "",
  rightLabel,
  marginBottom = "12px",
  ...props
}: CustomTextFieldProps<T>) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => {
        return (
          <Box sx={{ marginBottom: marginBottom }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#4C616C",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                }}
              >
                {label}
              </Typography>
              {rightLabel && <Box>{rightLabel}</Box>}
            </Box>
            <BaseTextField
              {...props}
              {...field}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#E1E3E4",
                  borderRadius: "8px",
                  "& fieldset": {
                    borderColor: "#95CFE7",
                    borderWidth: "1px 1px 2px 1px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#95CFE7",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#95CFE7",
                    borderWidth: "1px 1px 2px 1px",
                  },
                  "&.Mui-error fieldset": {
                    borderColor: "#d32f2f",
                  },
                  "&.Mui-error:hover fieldset": {
                    borderColor: "#d32f2f",
                  },
                  "&.Mui-error.Mui-focused fieldset": {
                    borderColor: "#d32f2f",
                  },
                  "& input": {
                    padding: "18px 16px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "16px",
                    color: "#003544",
                    "&::placeholder": {
                      color: "#A3A3A3",
                      opacity: 1,
                    },
                  },
                },
                ...props.sx,
              }}
              type={props.type === "password" ? (showPassword ? "text" : "password") : props.type}
              value={field.value ?? ""}
              error={!!error}
              helperText={error?.message ? error.message : helperText}
              InputProps={{
                ...props.InputProps,
                endAdornment:
                  props.type === "password" ? (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOffOutlined sx={{ color: "#A3A3A3" }} /> : <VisibilityOutlined sx={{ color: "#A3A3A3" }} />}
                      </IconButton>
                    </InputAdornment>
                  ) : (
                    props.InputProps?.endAdornment
                  ),
              }}
              slotProps={{
                htmlInput: {
                  ...props.slotProps?.htmlInput,
                  autoComplete: "off",
                },
              }}
            />
          </Box>
        );
      }}
    />
  );
};

export default TextField;
