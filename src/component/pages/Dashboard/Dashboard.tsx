import { Box, Button } from "@mui/material";
import { useState } from "react";

// Karena kita pakai index.ts, importnya cukup sampai folder Modal
import Modal from "../../ui/Modal";

const Dashboard = () => {
  // 1. Berikan tipe data <boolean> dan nilai awal (false)
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleClose = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);

  return (
    <Box sx={{ p: 4 }}>
      <Button type="button" variant="contained" onClick={handleOpenModal}>
        Open Modal
      </Button>

      {/* Komponen Modal yang sudah sakti dengan TypeScript */}
      <Modal open={openModal} handleClose={handleClose} title="Judul Modal">
        <Box
          sx={{
            padding: 2,
            width: 500,
          }}
        >
          Isi Modal ini sekarang "Type-Safe"
        </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard;
