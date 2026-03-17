import { TextField as BaseTextField, Box, TextFieldProps } from "@mui/material";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

// 1. Definisikan Interface Props dengan Generic <T>
// Kita mewarisi TextFieldProps dari MUI agar semua fitur asli (seperti type="password") tetap ada.
interface CustomTextFieldProps<T extends FieldValues> extends Omit<
  TextFieldProps,
  "name"
> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  defaultValue?: any;
}

const TextField = <T extends FieldValues>({
  control,
  name,
  label,
  defaultValue = "",
  helperText = "",
  ...props
}: CustomTextFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => {
        return (
          <Box sx={{ marginBottom: 2 }}>
            <BaseTextField
              {...props}
              {...field}
              fullWidth
              label={label}
              variant="outlined"
              value={field.value ?? ""}
              error={!!error}
              helperText={helperText}
            />
          </Box>
        );
      }}
    />
  );
};

export default TextField;
