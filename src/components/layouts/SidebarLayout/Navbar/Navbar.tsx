import { Box, Stack } from "@mui/material";
import React from "react";
import Dropdown from "../../../ui/Forms/Dropdown";
import { AccountCircle } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import Avatar from "../../../ui/Avatar";
import session from "@/utils/session";
import { useNavigate } from "react-router";

// 👇 Kita bisa define tipe DropdownOption di sini
//    atau nanti akan ada di file Dropdown.tsx itu sendiri
interface DropdownOption {
  label: string;
  onClick: () => void;
}

const Navbar = (): React.ReactElement => {
  // options diberi tipe array of DropdownOption
  const navigate = useNavigate();

  const options: DropdownOption[] = [
    {
      label: "Profile",
      onClick() {
        console.log("handle navigate to profile");
      },
    },
    {
      label: "Logout",
      onClick() {
        session.clearSession();
        navigate("/login")

        console.log("Handle logout");
      },
    },
  ];

  return (
    <Box
      sx={{
        padding: 1,
        borderBottom: `1px solid ${grey[300]}`,
        background: "#ffffff",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1100,
      }}
    >
      <Stack justifyContent={"center"} alignItems={"flex-end"} paddingX={1}>
        <Dropdown icon={<AccountCircle />} options={options} />
      </Stack>
    </Box>
  );
};
export default Navbar;
