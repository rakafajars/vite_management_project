import { Avatar as BaseAvatar, Box, Popover, Typography } from "@mui/material";
import { useState, MouseEvent } from "react";

function stringToColor(string: string): string {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  const initialName = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const displayName =
    initialName.length >= 2 ? initialName.substring(0, 2) : initialName;

  return {
    sx: {
      bgcolor: stringToColor(name),
      cursor: "pointer",
    },
    children: `${displayName}`,
  };
}

interface AvatarProps {
  text: string;
  onClick?: () => void;
}

const Avatar = ({ text, onClick }: AvatarProps) => {
  // Tipe data state untuk element anchor Popover
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (e: MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  return (
    <>
      <BaseAvatar
        {...stringAvatar(text)}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={onClick}
      />

      <Popover
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box padding={1}>
          <Typography>{text}</Typography>
        </Box>
      </Popover>
    </>
  );
};

export default Avatar;
