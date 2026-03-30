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
  Pagination,
  TableSortLabel,
  Stack,
  Typography,
  Select,
  MenuItem
} from "@mui/material";
import React from "react";


// 1. Definisi struktur Kolom
export interface Coloumn<T> {
  id: string;
  label: string;
  align?: TableCellProps['align'];
  minWidth?: number;
  hideOnMobile?: boolean;
  sortable?: boolean;
  // render bersifat opsional, jika ada maka kita kirimkan data satu baris (row)
  render?: (row: T) => React.ReactNode;
}

// 2. Definisi Props Table dengan generic <T>
interface TableProps<T> {
  columns: Coloumn<T>[];
  data: T[];
  isLoading?: boolean;
  pagination?: {
    page: number;
    rowsPerPage: number;
    count: number;
    onPageChange: (event: unknown, newPage: number) => void;
    onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowsPerPageOptions?: number[] | { label: string; value: number }[];
  };
  sort?: {
    orderBy: string;
    order: 'asc' | 'desc';
    onRequestSort: (property: string) => void;
  };
}


const Table = <T extends { id: string | number }>({ columns,
  data,
  isLoading,
  pagination,
  sort,
}: TableProps<T>
): React.ReactElement => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Filter kolom berdasarkan layar
  const visibleColumns = isMobile
    ? columns.filter((col) => !col.hideOnMobile)
    : columns;

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
                sortDirection={sort?.orderBy === coloumn.id ? sort.order : false}
                sx={{
                  fontWeight: 'bold',
                  color: '#003544',
                  minWidth: coloumn.minWidth,
                  whiteSpace: 'nowrap',
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  px: { xs: 1, sm: 2 },
                }}
              >
                {coloumn.sortable && sort ? (
                  <TableSortLabel
                    active={sort.orderBy === coloumn.id}
                    direction={sort.orderBy === coloumn.id ? sort.order : 'asc'}
                    onClick={() => sort.onRequestSort(coloumn.id)}
                  >
                    {coloumn.label}
                  </TableSortLabel>
                ) : (
                  coloumn.label
                )}
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
    {pagination && (
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          {pagination.onRowsPerPageChange && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Baris per halaman:
              </Typography>
              <Select
                size="small"
                value={pagination.rowsPerPage}
                onChange={(e) => pagination.onRowsPerPageChange && pagination.onRowsPerPageChange(e as any)}
                sx={{ fontSize: '0.875rem', '& .MuiSelect-select': { py: 0.5 } }}
              >
                {(pagination.rowsPerPageOptions || [5, 10, 25]).map((val) => {
                  const value = typeof val === 'number' ? val : val.value;
                  const label = typeof val === 'number' ? val : val.label;
                  return (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  );
                })}
              </Select>
            </Stack>
          )}
          <Typography variant="body2" color="text.secondary">
            Menampilkan {data.length === 0 ? 0 : pagination.page * pagination.rowsPerPage + 1} -{" "}
            {Math.min((pagination.page + 1) * pagination.rowsPerPage, pagination.count)} dari{" "}
            {pagination.count} data
          </Typography>
        </Stack>
        <Pagination
          count={Math.ceil(pagination.count / pagination.rowsPerPage) || 1}
          page={pagination.page + 1}
          onChange={(event, newPage) => pagination.onPageChange(event, newPage - 1)}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Stack>
    )}
  </TableContainer>)
}


export default Table;