import { Close } from "@mui/icons-material";
import {
  Modal as BaseModal,
  Box,
  IconButton,
  Stack,
  Typography,
  SxProps,
  Theme,
  ModalProps as MuiModalProps,
} from "@mui/material";
import { ReactNode } from "react";

// 1. Definisikan Interface Props
// Kita menggunakan Omit untuk 'onClose' karena kita menggantinya dengan 'handleClose' yang lebih deskriptif
interface CustomModalProps extends Omit<MuiModalProps, "children" | "onClose"> {
  title: string;
  open: boolean;
  handleClose: () => void;
  children: ReactNode; // Tipe data standar untuk elemen apa pun yang bisa dirender
  sx?: SxProps<Theme>; // Agar kita tetap bisa mengirimkan custom styling dari luar
}

const Modal = ({
  title,
  open,
  handleClose,
  sx,
  children,
  ...props
}: CustomModalProps) => {
  return (
    <BaseModal {...props} open={open} onClose={handleClose}>
      <Box
        sx={{
          borderRadius: 1,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%", // Responsif: gunakan width 90% tapi dibatasi maxWidth
          maxWidth: 1200,
          bgcolor: "background.paper",
          boxShadow: 24,
          outline: "none", // Menghilangkan border biru saat modal terbuka
          ...sx,
        }}
      >
        {/* Header Modal */}
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          spacing={2}
          sx={{
            p: 2,
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h6" component={"h2"}>
            {title}
          </Typography>
          <IconButton type="button" onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Stack>

        {/* Content Modal */}
        <Box
          sx={{
            p: 2,
            maxHeight: "70vh", // Menggunakan vh (viewport height) agar pas di layar kecil
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </BaseModal>
  );
};

export default Modal;