import { Paper, Typography, Box, Stack, Button, IconButton, InputAdornment } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import Table, { Coloumn } from "../../ui/Table/Table";
import { useEffect, useState } from "react";
import { SkillsResponseData } from "@/services/api/skills";
import services from "@/services";
import { useForm, useWatch } from "react-hook-form";
import TextField from "@/components/ui/Forms/TextField/TextField";
import { useDebounce } from 'use-debounce';
import { BaseApiResponse, BaseMeta } from "@/types/api";
import Dialog from "@/components/ui/Dialog";
import Snackbar from "@/components/ui/Snackbar";
import { AxiosError } from "axios";

const Skills = () => {
  const [data, setData] = useState<SkillsResponseData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // States untuk UI Pagination dan Search (mocking)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [boardsMeta, setBoardsMeta] = useState<BaseMeta>();

  // States untuk UI Sort (mocking)
  const [orderBy, setOrderBy] = useState<string>("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const { control } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const watchSearch = useWatch({
    control,
    name: 'search'
  });

  const [debounceSearch] = useDebounce(watchSearch, 1000);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPage(0);
  };

  const fetchSkills = async () => {
    setIsLoading(true);
    try {
      const response = await services.skills.skills({
        search: debounceSearch,
        page: page + 1,
        limit: rowsPerPage,
        sort: `${orderBy} ${order.toUpperCase()}`
      });
      setData(response.data.data ?? []);
      setBoardsMeta(response.data.meta);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
  }, [debounceSearch]);

  useEffect(() => {
    fetchSkills();
  }, [debounceSearch, rowsPerPage, page, orderBy, order]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("error");

  // State untuk mengontrol buka/tutup dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  // State untuk menyimpan id yang akan dihapus
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleDeleteConfirm = async () => {
    if (!selectedId) return;

    try {
      await services.skills.deleteSkill(selectedId);

      setIsDeleteDialogOpen(false);
      setSnackbarSeverity("success");
      setSnackbarMessage('Berhasil menghapus keahlian');
      setOpenSnackbar(true);
      fetchSkills();
    } catch (error) {
      const axiosError = error as AxiosError<BaseApiResponse>;
      const errorMessage = axiosError.response?.data?.error
        || axiosError.response?.data?.message
        || 'Silahkan coba lagi.';

      setSnackbarSeverity("error");
      setSnackbarMessage(errorMessage);
      setOpenSnackbar(true);
    }
  }

  // Definisi Kolom Tabel
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
            onClick={() => {
              setSelectedId(row.ID);
              setIsDeleteDialogOpen(true);
            }}
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
            onClick={() => {
              setSelectedId(row.ID);
              setIsDeleteDialogOpen(true);
            }}
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
            count: boardsMeta?.total ?? 0,
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

      {/* --- KOMPONEN DIALOG HAPUS --- */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Hapus Keahlian?"
        message="Apakah kamu yakin ingin menghapus keahlian ini? Data yang sudah dihapus tidak bisa dikembalikan."
        actions={[
          {
            label: "Ya",
            onClick: handleDeleteConfirm,
            variant: "contained"
          },
          {
            label: "Batal",
            onClick: () => setIsDeleteDialogOpen(false),
            variant: "outlined"
          }
        ]}
      />

      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </SidebarLayout>
  );
};

export default Skills;