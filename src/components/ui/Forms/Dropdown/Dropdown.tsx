import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState, MouseEvent, ReactNode } from "react";

// 1. Definisikan Interface untuk Option
interface DropdownOption {
  label: string;
  onClick: () => void;
}

// 2. Definisikan Interface untuk Props
interface DropdownProps {
  options: DropdownOption[];
  icon: ReactNode; // Untuk menerima komponen Icon seperti <MoreVert />
}

const Dropdown = ({ options, icon }: DropdownProps) => {
  // 3. Tentukan tipe data anchorEl (HTMLElement atau null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
};

export default Dropdown;
