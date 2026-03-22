import {
  Pagination as BasePagination,
  Box,
  Stack,
  PaginationProps as MuiPaginationProps,
} from "@mui/material";
import { ChangeEvent } from "react";

// 1. Definisikan Interface Props
interface CustomPaginationProps {
  count: number;
  // Kita definisikan tipe data untuk onChange secara spesifik sesuai standar MUI
  onChange: (event: ChangeEvent<unknown>, page: number) => void;
  // Kita bisa menambahkan props opsional tambahan jika ingin fleksibel
  page?: number;
}

const Pagination = ({ count, onChange, page }: CustomPaginationProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Stack spacing={2} sx={{ marginTop: 2 }}>
        <BasePagination
          count={count}
          page={page}
          onChange={onChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
};

export default Pagination;
