import { Paper, Typography, Box, Stack, Button, IconButton, InputAdornment } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import Table, { Coloumn } from "../../ui/Table/Table";
import { SkillsResponseData } from "@/services/api/skills";
import services from "@/services";
import TextField from "@/components/ui/Forms/TextField/TextField";
import Dialog from "@/components/ui/Dialog";
import Snackbar from "@/components/ui/Snackbar";
import useTablePage from "@/hooks/useTablePage";

const Skills = () => {
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
    openSnackbar,
    snackbarMessage,
    snackbarSeverity,
    closeSnackbar,
  } = useTablePage<SkillsResponseData>({
    defaultOrderBy: "name",
    fetchFn: (params) => services.skills.skills(params),
    deleteFn: (id) => services.skills.deleteSkill(id),
    deleteSuccessMessage: "Berhasil menghapus keahlian",
  });

  const columns: Coloumn<SkillsResponseData>[] = [
    {
      id: "name",
      label: "Keahlian",
      minWidth: 160,
      sortable: true,
      render: (row) => (
        <Typography variant="body2" fontWeight="bold" color="#003544">
          {row.name}
        </Typography>
      ),
    },
    {
      id: "category",
      label: "Kategori",
      minWidth: 140,
      sortable: true,
      render: (row) => (
        <Typography variant="body2" color="textSecondary">
          {row.category}
        </Typography>
      ),
    },
    {
      id: "level",
      label: "Tingkat",
      minWidth: 140,
      sortable: true,
      render: (row) => (
        <Typography variant="body2" color="textSecondary">
          {row.level}
        </Typography>
      ),
    },
    {
      id: "id",
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
      pageTitle="Keahlian"
      breadcrumbs={[
        {
          label: "Keahlian",
          href: "/skills",
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
            Daftar Keahlian
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" sx={{ width: { xs: "100%", sm: "auto" } }}>
            <Box sx={{ width: { xs: "100%", sm: 250 } }}>
              <TextField
                control={control}
                name="search"
                placeholder="Cari keahlian..."
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
            >
              Tambah
            </Button>
          </Stack>
        </Stack>
        <Table<SkillsResponseData>
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
        title="Hapus Keahlian?"
        message="Apakah kamu yakin ingin menghapus keahlian ini? Data yang sudah dihapus tidak bisa dikembalikan."
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

      <Snackbar
        open={openSnackbar}
        onClose={closeSnackbar}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </SidebarLayout>
  );
};

export default Skills;
