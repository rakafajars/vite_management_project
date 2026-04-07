import { Paper, Typography, Box, Stack, Chip, Button, IconButton, InputAdornment } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import Table, { Coloumn } from "../../ui/Table/Table";
import { EducationResponseData } from "@/services/api/education";
import services from "@/services";
import dayjs from "dayjs";
import TextField from "@/components/ui/Forms/TextField/TextField";
import Dialog from "@/components/ui/Dialog";
import useTablePage from "@/hooks/useTablePage";
import { ROUTES } from "@/constants/routes";
import { useNavigate } from "react-router";

const Education = () => {
  const {
    data,
    isLoading,
    meta,
    control,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    order,
    orderBy,
    handleRequestSort,
    isDeleteDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    handleDeleteConfirm,
  } = useTablePage<EducationResponseData>({
    defaultOrderBy: "institution",
    fetchFn: (params) => services.education.education(params),
    deleteFn: (id) => services.education.deleteEducation(id),
    deleteSuccessMessage: "Berhasil menghapus pendidikan",
  });

  const navigate = useNavigate();

  const columns: Coloumn<EducationResponseData>[] = [
    {
      id: "institution",
      label: "Institusi",
      minWidth: 180,
      sortable: true,
      render: (row) => (
        <Box>
          <Typography variant="body2" fontWeight="bold" color="#003544">
            {row.institution}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {row.degree}
          </Typography>
        </Box>
      ),
    },
    {
      id: "field_of_study",
      label: "Bidang Studi",
      minWidth: 140,
      sortable: true,
      render: (row) => (
        <Typography variant="body2" color="textSecondary">
          {row.field_of_study}
        </Typography>
      ),
    },
    {
      id: "start_date",
      label: "Periode",
      minWidth: 140,
      sortable: true,
      render: (row) => {
        const start = dayjs(row.start_date).format("MMM YYYY");
        const end = row.is_current
          ? "Sekarang"
          : dayjs(row.end_date).format("MMM YYYY");
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2">{`${start} - ${end}`}</Typography>
            {row.is_current && (
              <Chip
                label="Aktif"
                size="small"
                color="success"
                variant="outlined"
                sx={{ height: 20, fontSize: "10px" }}
              />
            )}
          </Stack>
        );
      },
    },
    {
      id: "gpa",
      label: "IPK",
      minWidth: 80,
      sortable: true,
      render: (row) => (
        <Typography variant="body2" color="textSecondary">
          {row.gpa}
        </Typography>
      ),
    },
    {
      id: "ID",
      label: "Aksi",
      align: "center",
      render: (row) => (
        <Stack direction="row" spacing={0.5} justifyContent="center">
          <IconButton
            size="small"
            color="primary"
            onClick={() => console.log("Edit ID:", row.ID)}
            sx={{ display: { xs: "inline-flex", sm: "none" } }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => openDeleteDialog(row.ID)}
            sx={{ display: { xs: "inline-flex", sm: "none" } }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>

          <Button
            variant="outlined"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => console.log("Edit ID:", row.ID)}
            sx={{ display: { xs: "none", sm: "inline-flex" }, textTransform: "none" }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => openDeleteDialog(row.ID)}
            sx={{ display: { xs: "none", sm: "inline-flex" }, textTransform: "none" }}
          >
            Hapus
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <SidebarLayout
      pageTitle="Pendidikan"
      breadcrumbs={[
        {
          label: "Pendidikan",
          href: ROUTES.EDUCATION,
        },
      ]}
    >
      <Paper
        sx={{
          p: { xs: 1.5, sm: 2 },
          borderRadius: 3,
          background: "white",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Daftar Pendidikan
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" sx={{ width: { xs: "100%", sm: "auto" } }}>
            <Box sx={{ width: { xs: "100%", sm: 250 } }}>
              <TextField
                control={control}
                name="search"
                placeholder="Cari pendidikan..."
                marginBottom={0}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" sx={{ color: "#A3A3A3" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    "& input": {
                      padding: "8px 14px",
                      fontSize: "14px",
                    },
                  },
                }}
              />
            </Box>
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              sx={{
                bgcolor: "#003544",
                textTransform: "none",
                "&:hover": { bgcolor: "#002530" },
                width: { xs: "100%", sm: "auto" },
                padding: "8px 16px",
              }}
              onClick={() => navigate(ROUTES.CREATE_UPDATE_EDUCATION)}
            >
              Tambah
            </Button>
          </Stack>
        </Stack>
        <Table<EducationResponseData>
          columns={columns}
          data={data}
          isLoading={isLoading}
          pagination={{
            page,
            rowsPerPage,
            count: meta?.total ?? 0,
            onPageChange: handleChangePage,
            onRowsPerPageChange: handleChangeRowsPerPage,
          }}
          sort={{
            order,
            orderBy,
            onRequestSort: handleRequestSort,
          }}
        />
      </Paper>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        title="Hapus Pendidikan?"
        message="Apakah kamu yakin ingin menghapus pendidikan ini? Data yang sudah dihapus tidak bisa dikembalikan."
        actions={[
          {
            label: "Ya",
            onClick: handleDeleteConfirm,
            variant: "contained",
          },
          {
            label: "Batal",
            onClick: closeDeleteDialog,
            variant: "outlined",
          },
        ]}
      />
    </SidebarLayout>
  );
};

export default Education;
