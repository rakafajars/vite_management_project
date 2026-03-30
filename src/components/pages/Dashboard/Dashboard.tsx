import {
  Paper,
  Typography,
  Box,
  Stack,
  Chip,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Grid,
  alpha,
  Skeleton,
} from "@mui/material";
import {
  Work as WorkIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  Psychology as PsychologyIcon,
  Business as BusinessIcon,
  TrendingUp as TrendingUpIcon,
  AccessTime as AccessTimeIcon,
  ArrowForward as ArrowForwardIcon,
  Lock as LockIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import Table, { Coloumn } from "../../ui/Table/Table";
import { useEffect, useMemo, useState } from "react";
import { WorkExperienceResponseData } from "@/services/api/work_experience";
import services from "@/services";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

// ── Warna & Tema ──────────────────────────────────
const PRIMARY = "#003544";
const ACCENT = "#0077B6";
const GRADIENT_1 = "linear-gradient(135deg, #003544 0%, #006D77 100%)";
const GRADIENT_2 = "linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)";
const GRADIENT_3 = "linear-gradient(135deg, #2D6A4F 0%, #52B788 100%)";

// ── CV Section Card ───────────────────────────────
interface CVSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  done: boolean;
  count?: number;
  href?: string;
}

const CVSectionCard: React.FC<CVSectionProps> = ({
  title,
  description,
  icon,
  done,
  count,
  href,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => href && done && navigate(href)}
      sx={{
        height: "100%",
        cursor: done && href ? "pointer" : "default",
        border: done ? `2px solid ${ACCENT}` : "2px solid #e0e0e0",
        borderRadius: 3,
        position: "relative",
        overflow: "visible",
        transition: "all 0.3s ease",
        opacity: done ? 1 : 0.6,
        "&:hover": done
          ? {
            transform: "translateY(-4px)",
            boxShadow: `0 8px 25px ${alpha(ACCENT, 0.25)}`,
          }
          : {},
      }}
    >
      {/* Badge status */}
      <Chip
        label={done ? "Selesai" : "Segera"}
        size="small"
        icon={done ? undefined : <LockIcon sx={{ fontSize: 14 }} />}
        color={done ? "success" : "default"}
        variant={done ? "filled" : "outlined"}
        sx={{
          position: "absolute",
          top: -12,
          right: 12,
          fontWeight: 600,
          fontSize: "0.7rem",
        }}
      />

      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: done
                ? GRADIENT_2
                : "linear-gradient(135deg, #bdbdbd, #e0e0e0)",
              color: "#fff",
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle1" fontWeight={700} color={PRIMARY}>
              {title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {description}
            </Typography>
          </Box>
        </Stack>

        {done && count !== undefined && (
          <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              label={`${count} data`}
              size="small"
              sx={{
                bgcolor: alpha(ACCENT, 0.1),
                color: ACCENT,
                fontWeight: 600,
              }}
            />
            <ArrowForwardIcon sx={{ fontSize: 16, color: ACCENT, ml: "auto" }} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

// ── Stat Card ─────────────────────────────────────
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  gradient,
}) => (
  <Card
    sx={{
      background: gradient,
      color: "#fff",
      borderRadius: 3,
      height: "100%",
      transition: "transform 0.3s ease",
      "&:hover": { transform: "translateY(-2px)" },
    }}
  >
    <CardContent sx={{ p: 2.5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="caption" sx={{ opacity: 0.85, fontWeight: 500 }}>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight={800} sx={{ my: 0.5 }}>
            {value}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.75 }}>
            {subtitle}
          </Typography>
        </Box>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            bgcolor: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

// ── Dashboard Component ───────────────────────────
const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<WorkExperienceResponseData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWorkExperience = async () => {
    setIsLoading(true);
    try {
      const response = await services.workExperience.workExperience();
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

  // ── Derived stats ──
  const stats = useMemo(() => {
    const totalExperience = data.length;
    const activePosisi = data.filter((d) => d.is_current).length;
    const uniqueCompanies = new Set(data.map((d) => d.company_name)).size;

    // Hitung durasi terlama
    let longestYears = 0;
    data.forEach((d) => {
      const start = dayjs(d.start_date);
      const end = d.is_current ? dayjs() : dayjs(d.end_date);
      const years = end.diff(start, "year", true);
      if (years > longestYears) longestYears = years;
    });

    return {
      totalExperience,
      activePosisi,
      uniqueCompanies,
      longestYears: longestYears > 0 ? `${longestYears.toFixed(1)} thn` : "-",
    };
  }, [data]);

  // ── Definisi CV sections ──
  const cvSections: CVSectionProps[] = [
    {
      title: "Pengalaman Kerja",
      description: "Riwayat pekerjaan & posisi",
      icon: <WorkIcon />,
      done: true,
      count: data.length,
      href: "/pengalaman-kerja",
    },
    {
      title: "Pendidikan",
      description: "Riwayat pendidikan formal",
      icon: <SchoolIcon />,
      done: false,
    },
    {
      title: "Keahlian",
      description: "Skill teknis & soft skill",
      icon: <PsychologyIcon />,
      done: false,
    },
    {
      title: "Proyek",
      description: "Portfolio & proyek pribadi",
      icon: <CodeIcon />,
      done: false,
    },
  ];

  // ── Kolom tabel ──
  const columns: Coloumn<WorkExperienceResponseData>[] = [
    {
      id: "company_name",
      label: "Perusahaan",
      render: (row) => (
        <Box>
          <Typography variant="body2" fontWeight="bold" color={PRIMARY}>
            {row.company_name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {row.position}
          </Typography>
        </Box>
      ),
    },
    {
      id: "start_date",
      label: "Periode",
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
      render: (row) => (
        <Typography variant="body2" sx={{ maxWidth: 300 }}>
          {row.description && row.description.length > 80
            ? `${row.description.substring(0, 80)}...`
            : row.description}
        </Typography>
      ),
    },
  ];

  // ── CV Progress ──
  const completedSections = cvSections.filter((s) => s.done).length;
  const progressPercent = (completedSections / cvSections.length) * 100;

  return (
    <SidebarLayout pageTitle="Dashboard">
      <Stack spacing={3}>
        {/* ── Welcome Header ── */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            background: GRADIENT_1,
            borderRadius: 3,
            color: "#fff",
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            👋 Selamat Datang di CV Builder
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5 }}>
            {dayjs().format("dddd, D MMMM YYYY")} — Kelola dan bangun CV
            profesional kamu di sini.
          </Typography>

          <Box sx={{ mt: 2.5 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 0.5 }}
            >
              <Typography variant="caption" fontWeight={600}>
                Progress CV
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                {completedSections}/{cvSections.length} bagian selesai
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={progressPercent}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: "rgba(255,255,255,0.2)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,
                  bgcolor: "#48CAE4",
                },
              }}
            />
          </Box>
        </Paper>

        {/* ── CV Sections Grid ── */}
        <Box>
          <Typography variant="h6" fontWeight={700} color={PRIMARY} sx={{ mb: 2 }}>
            Bagian CV
          </Typography>
          <Grid container spacing={2}>
            {cvSections.map((section) => (
              <Grid
                key={section.title}
                size={{ xs: 12, sm: 6, md: 3 }}
              >
                <CVSectionCard {...section} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ── Stat Cards ── */}
        <Box>
          <Typography variant="h6" fontWeight={700} color={PRIMARY} sx={{ mb: 2 }}>
            Ringkasan Pengalaman Kerja
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard
                title="Total Pengalaman"
                value={isLoading ? "..." : stats.totalExperience}
                subtitle="Total riwayat pekerjaan"
                icon={<WorkIcon />}
                gradient={GRADIENT_1}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard
                title="Posisi Aktif"
                value={isLoading ? "..." : stats.activePosisi}
                subtitle="Pekerjaan saat ini"
                icon={<BusinessIcon />}
                gradient={GRADIENT_2}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard
                title="Pengalaman Terlama"
                value={isLoading ? "..." : stats.longestYears}
                subtitle="Durasi terpanjang"
                icon={<AccessTimeIcon />}
                gradient={GRADIENT_3}
              />
            </Grid>
          </Grid>
        </Box>

        {/* ── Table Pengalaman Kerja Terbaru ── */}
        <Paper sx={{ p: 2.5, borderRadius: 3 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={1}
            sx={{ mb: 2 }}
          >
            <Typography variant="h6" fontWeight={700} color={PRIMARY}>
              Pengalaman Kerja Terbaru
            </Typography>
            <Button
              variant="outlined"
              size="small"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/pengalaman-kerja")}
              sx={{
                borderColor: ACCENT,
                color: ACCENT,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { borderColor: PRIMARY, color: PRIMARY },
              }}
            >
              Lihat Semua
            </Button>
          </Stack>
          <Table<WorkExperienceResponseData>
            columns={columns}
            data={data}
            isLoading={isLoading}
          />
        </Paper>
      </Stack>
    </SidebarLayout>
  );
};

export default Dashboard;
