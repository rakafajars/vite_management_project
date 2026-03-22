import { Box, SxProps, Theme } from "@mui/material";
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
}

const DatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  helperText,
  sx,
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
          <Box sx={{ marginBottom: 2 }}>
            <BaseDatePicker
              {...props}
              {...field}
              label={label}
              value={value ? dayjs(value) : null}
              onChange={(newValue: Dayjs | null) => {
                onChange(newValue ? newValue.toISOString() : null);
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                  error: !!error,
                  helperText: error ? error.message : helperText,
                  sx: { ...sx },
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
