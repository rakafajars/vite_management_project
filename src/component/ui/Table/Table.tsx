import {
  Table as BaseTable,
  Box,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ReactNode } from "react";

// 1. Definisikan Interface untuk Kolom menggunakan Generic <T>
// T mewakili bentuk data objek dalam array data kita nanti.
export interface Column<T> {
  id: string;
  label: string;
  align?: "left" | "right" | "center";
  // render adalah fungsi opsional yang menerima data satu baris (row)
  render?: (row: T) => ReactNode;
}

// 2. Definisikan Props untuk Komponen Table
interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

// 3. Gunakan Generic <T> pada fungsi komponen
// Pastikan nama prop 'columns' dieja dengan benar (tadi 'coloumns')
const Table = <T extends { id: string | number }>({ 
  columns, 
  data 
}: TableProps<T>) => {
  
  if (!columns || !data || data.length === 0) {
    return <Box sx={{ p: 2, textAlign: 'center' }}>Data Tidak Tersedia</Box>;
  }

  return (
    <TableContainer component={Paper}>
      <BaseTable sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align={column.align || "left"}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((column) => (
                <TableCell key={`${row.id}-${column.id}`} align={column.align || "left"}>
                  {/* Jika ada fungsi render, gunakan itu. Jika tidak, ambil field berdasarkan ID */}
                  {column.render 
                    ? column.render(row) 
                    : (row as any)[column.id] // 'as any' digunakan karena kita akses via string key
                  }
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </BaseTable>
    </TableContainer>
  );
};

export default Table;