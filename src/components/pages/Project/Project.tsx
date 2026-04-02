import { Paper, Typography, Box, Stack, Button, IconButton, InputAdornment } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import Table, { Coloumn } from "../../ui/Table/Table";
import { ProjectResponseData } from "@/services/api/project";
import services from "@/services";
import TextField from "@/components/ui/Forms/TextField/TextField";
import Dialog from "@/components/ui/Dialog";
import useTablePage from "@/hooks/useTablePage";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";

const Project = () => {
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
  } = useTablePage<ProjectResponseData>({
    defaultOrderBy: "title",
    fetchFn: (params) => services.project.project(params),
    deleteFn: (id) => services.project.deleteProject(id),
    deleteSuccessMessage: "Berhasil menghapus project",
  });

  const navigate = useNavigate();

  const columns: Coloumn<ProjectResponseData>[] = [
    {
      id: "title",
      label: "Judul Project",
      minWidth: 160,
      sortable: true,
      render: (row) => (
        <Typography variant="body2" fontWeight="bold" color="#003544">
          {row.title}
        </Typography>
      ),
    },
    {
      id: "description",
      label: "Deskripsi",
      minWidth: 200,
      sortable: true,
      render: (row) => (
        <Typography variant="body2" color="textSecondary" sx={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {row.description}
        </Typography>
      ),
    },
    {
      id: "tech_stack",
      label: "Tech Stack",
      minWidth: 140,
      sortable: true,
      render: (row) => (
        <Typography variant="body2" color="textSecondary">
          {row.tech_stack}
        </Typography>
      ),
    },
    {
      id: "link",
      label: "Link",
      minWidth: 100,
      sortable: true,
      render: (row) => (
        <Typography variant="body2" color="primary" component="a" href={row.link} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
          Lihat
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
      pageTitle="Project"
      breadcrumbs={[
        {
          label: "Project",
          href: ROUTES.PROJECT,
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
            Daftar Project
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" sx={{ width: { xs: "100%", sm: "auto" } }}>
            <Box sx={{ width: { xs: "100%", sm: 250 } }}>
              <TextField
                control={control}
                name="search"
                placeholder="Cari Project..."
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
              onClick={() => navigate(ROUTES.CREATE_UPDATE_PROJECT)}
            >
              Tambah
            </Button>
          </Stack>
        </Stack>
        <Table<ProjectResponseData>
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
        title="Hapus Project?"
        message="Apakah kamu yakin ingin menghapus project ini? Data yang sudah dihapus tidak bisa dikembalikan."
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

export default Project;