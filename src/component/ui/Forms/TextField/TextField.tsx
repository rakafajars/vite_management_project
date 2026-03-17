import { TextField as BaseTextField, Box, TextFieldProps } from "@mui/material";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

// 1. Definisikan Interface Props dengan Generic <T>
// Kita mewarisi TextFieldProps dari MUI agar semua fitur asli (seperti type="password") tetap ada.
interface CustomTextFieldProps<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
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
  ...props
}: CustomTextFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      // Ambil 'field' secara utuh di sini
      render={({ field, fieldState: { error } }) => {
        return (
          <Box sx={{ marginBottom: 2 }}>
            <BaseTextField
              {...props}
              {...field} // Variabel 'field' sekarang ditemukan!
              fullWidth
              label={label}
              variant="outlined"
              value={field.value ?? ""} // Pakai field.value
              error={!!error}
              helperText={error ? error.message : props.helperText}
            />
          </Box>
        );
      }}
    />
  );
};

export default TextField;