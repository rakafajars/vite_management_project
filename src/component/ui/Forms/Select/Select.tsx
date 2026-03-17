import {
  Select as BaseSelect,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  SelectProps as BaseSelectProps,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

// 1. Interface untuk tiap item di dropdown
interface SelectOption {
  value: string | number;
  label: string;
}

// 2. Props Komponen dengan Generic <T>
interface CustomSelectProps<T extends FieldValues> extends Omit<
  BaseSelectProps,
  "name"
> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: SelectOption[];
  helperText?: string;
  id: string;
}

const Select = <T extends FieldValues>({
  control,
  label,
  helperText,
  name,
  id,
  options,
  // defaultValue dihapus dari props destructuring jika tidak digunakan
  ...props
}: CustomSelectProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      // defaultValue={defaultValue} <--- HAPUS BARIS INI
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel id={id}>{label}</InputLabel>
          <BaseSelect
            {...props}
            {...field}
            value={field.value ?? ""}
            label={label}
          >
            {options?.map((option, index) => (
              <MenuItem key={`${option.value}-${index}`} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </BaseSelect>
          <FormHelperText>{error ? error.message : helperText}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default Select;
