import { Box, SxProps, Theme, Typography } from "@mui/material";
import { DatePicker as BaseDatePicker } from "@mui/x-date-pickers";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

// 1. Definisikan Interface Props
interface CustomDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  helperText?: string;
  sx?: SxProps<Theme>;
  marginBottom?: string | number;
}

const DatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  helperText,
  sx,
  marginBottom = "12px",
  ...props
}: CustomDatePickerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, ...field },
        fieldState: { error },
      }) => {
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
                  letterSpacing: "0.8px",
                }}
              >
                {label}
              </Typography>
            </Box>
            <BaseDatePicker
              {...props}
              {...field}
              value={value ? dayjs(value) : null}
              onChange={(newValue: Dayjs | null) => {
                onChange(newValue ? newValue.toISOString() : null);
              }}
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
                ...sx,
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                  error: !!error,
                  helperText: error ? error.message : helperText,
                },
              }}
            />
          </Box>
        );
      }}
    />
  );
};

export default DatePicker;
