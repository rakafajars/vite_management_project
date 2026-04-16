import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useState, MouseEvent, ReactNode } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

// Option untuk mode form (dengan value)
interface FormDropdownOption {
  label: string;
  value: string;
}

// Option untuk mode standalone (dengan onClick)
interface StandaloneDropdownOption {
  label: string;
  onClick: () => void;
}

// Props mode form (dengan control & name)
interface FormDropdownProps<T extends FieldValues> {
  options: FormDropdownOption[];
  placeholder?: string;
  name: Path<T>;
  control: Control<T>;
  icon?: never;
}

// Props mode standalone (dengan icon, tanpa control)
interface StandaloneDropdownProps {
  options: StandaloneDropdownOption[];
  icon: ReactNode;
  control?: never;
  name?: never;
  placeholder?: never;
}

type DropdownProps<T extends FieldValues = FieldValues> =
  | FormDropdownProps<T>
  | StandaloneDropdownProps;

const Dropdown = <T extends FieldValues>(props: DropdownProps<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Mode standalone (untuk Navbar, dll)
  if (!props.control) {
    const { options, icon } = props;
    return (
      <>
        <IconButton onClick={handleClick}>{icon}</IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {options?.map((option, index) => (
            <MenuItem
              key={`${option.label}-${index}`}
              onClick={() => {
                option.onClick();
                handleClose();
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }

  // Mode form (dengan react-hook-form Controller)
  const { options, placeholder = "Pilih opsi", name, control } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const selectedOption = options.find((opt) => opt.value === field.value);

        return (
          <Box>
            <Box
              onClick={handleClick}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                backgroundColor: "#E1E3E4",
                borderRadius: "8px",
                border: error
                  ? "1px solid #d32f2f"
                  : "1px solid #95CFE7",
                borderBottomWidth: "2px",
                padding: "18px 16px",
                cursor: "pointer",
                "&:hover": {
                  borderColor: error ? "#d32f2f" : "#95CFE7",
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  color: selectedOption ? "#003544" : "#A3A3A3",
                }}
              >
                {selectedOption?.label || placeholder}
              </Typography>
              <KeyboardArrowDown
                sx={{
                  color: "#A3A3A3",
                  transition: "transform 0.2s",
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </Box>
            {error?.message && (
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  color: "#d32f2f",
                  mt: 0.5,
                  ml: 1.75,
                }}
              >
                {error.message}
              </Typography>
            )}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                paper: {
                  sx: {
                    width: anchorEl?.offsetWidth,
                    mt: 0.5,
                  },
                },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {options?.map((option, index) => (
                <MenuItem
                  key={`${option.value}-${index}`}
                  selected={option.value === field.value}
                  onClick={() => {
                    field.onChange(option.value);
                    handleClose();
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        );
      }}
    />
  );
};

export default Dropdown;
