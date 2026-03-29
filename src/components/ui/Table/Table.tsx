import {
  Table as BaseTable,
  Box,
  LinearProgress,
  Paper,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";


// 1. Definisi struktur Kolom
export interface Coloumn<T> {
  id: string;
  label: string;
  align?: TableCellProps['align'];
  minWidth?: number;
  hideOnMobile?: boolean;
  // render bersifat opsional, jika ada maka kita kirimkan data satu baris (row)
  render?: (row: T) => React.ReactNode;
}

// 2. Definisi Props Table dengan generic <T>
interface TableProps<T> {
  coloumns: Coloumn<T>[];
  data: T[];
  isLoading?: boolean;
}


const Table = <T extends { id: string | number }>({ coloumns,
  data,
  isLoading, }: TableProps<T>
): React.ReactElement => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Filter kolom berdasarkan layar
  const visibleColumns = isMobile
    ? coloumns.filter((col) => !col.hideOnMobile)
    : coloumns;

  if (!isLoading && (!data || data.length === 0)) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
        Data tidak tersedia
      </Box>
    );
  }

  return (<TableContainer component={Paper} sx={{
    position: 'relative',
    borderRadius: '12px',
    overflowX: 'auto',
  }} >
    {isLoading && (<LinearProgress sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1
    }} />)}


    <BaseTable sx={{ minWidth: isMobile ? "auto" : 500 }} >
      <TableHead sx={{
        backgroundColor: "#f8f9fa"
      }}>
        <TableRow>
          {
            visibleColumns.map((coloumn) => (
              <TableCell
                key={coloumn.id}
                align={coloumn.align || 'left'}
                sx={{
                  fontWeight: 'bold',
                  color: '#003544',
                  minWidth: coloumn.minWidth,
                  whiteSpace: 'nowrap',
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  px: { xs: 1, sm: 2 },
                }}
              >
                {coloumn.label}
              </TableCell>
            ))
          }
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((row) => (
          <TableRow
            key={row.id}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              '&:hover': { bgcolor: '#f5f5f5' },
            }}
          >
            {visibleColumns.map((coloumn) => (
              <TableCell
                key={coloumn.id}
                align={coloumn.align || 'left'}
                sx={{
                  px: { xs: 1, sm: 2 },
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                }}
              >
                {coloumn.render ? coloumn.render(row) : (row as any)[coloumn.id]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>

    </BaseTable>
  </TableContainer>)
}


export default Table;