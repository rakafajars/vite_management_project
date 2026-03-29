import { Paper, Typography, Box, Stack, Chip, Button, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import Table, { Coloumn } from "../../ui/Table/Table";
import { useEffect, useState } from "react";
import { WorkExperienceResponseData } from "@/services/api/work_experience";
import services from "@/services";
import dayjs from "dayjs";


const WorkExperience = () => {
  const [data, setData] = useState<WorkExperienceResponseData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWorkExperience = async () => {
    setIsLoading(true);
    try {
      const response = await services.workExperience.workExperince();
      setData(response.data.data ?? []);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkExperience();
  }, []);

  // Definisi Kolom Tabel
  const columns: Coloumn<WorkExperienceResponseData>[] = [
    {
      id: "company_name",
      label: "Perusahaan",
      minWidth: 160,
      render: (row) => (
        <Box>
          <Typography variant="body2" fontWeight="bold" color="#003544">
            {row.company_name}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {row.position}
          </Typography>
        </Box>
      ),
    },
    {
      id: "start_date",
      label: "Periode",
      minWidth: 140,
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
      id: "description",
      label: "Deskripsi",
      hideOnMobile: true,
      render: (row) => (
        <Typography variant="body2" sx={{ maxWidth: 300 }}>
          {row.description && row.description.length > 100
            ? `${row.description.substring(0, 100)}...`
            : row.description}
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
            onClick={() => console.log("Edit ID:", row.id)}
            sx={{ display: { xs: "inline-flex", sm: "none" } }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => console.log("Delete ID:", row.id)}
            sx={{ display: { xs: "inline-flex", sm: "none" } }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>

          <Button
            variant="outlined"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => console.log("Edit ID:", row.id)}
            sx={{ display: { xs: "none", sm: "inline-flex" }, textTransform: "none" }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => console.log("Delete ID:", row.id)}
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
      pageTitle="Pengalaman Kerja"
      breadcrumbs={[
        {
          label: "Pengalaman Kerja",
          href: "/pengalaman-kerja",
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
          spacing={1}
          sx={{ mb: 2 }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Daftar Pengalaman Kerja
          </Typography>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: "#003544",
              textTransform: "none",
              "&:hover": { bgcolor: "#002530" },
            }}
          >
            Tambah
          </Button>
        </Stack>
        <Table<WorkExperienceResponseData>
          coloumns={columns}
          data={data}
          isLoading={isLoading}
        />
      </Paper>
    </SidebarLayout>
  );
};

export default WorkExperience;
