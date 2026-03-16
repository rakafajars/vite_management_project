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

const Table = ({ coloumns, data }) => {
  if (!coloumns || !data || data.length == 0) {
    return <Box>Data Tidak Tersedia</Box>;
  }

  return (
    <TableContainer component={Paper}>
      <BaseTable sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {coloumns.map((coloumn) => (
              <TableCell key={coloumn.id} align={coloumn.align || "left"}>
                {coloumn.label}
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
              {coloumns.map((coloumn) => (
                <TableCell key={coloumn.id} align={coloumn.align || "left"}>
                  {coloumn.render ? coloumn.render(row) : row[coloumn.id]}
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
