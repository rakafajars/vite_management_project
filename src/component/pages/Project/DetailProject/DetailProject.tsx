import { Add, CalendarMonth, Person } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import SidebarLayout from "../../../layouts/SidebarLayout";

interface ProjectCardProps {
  title: string;
  description: string;
  progress: number;
  status: string;
  statusColor: string;
  deadline: string;
  members: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  progress,
  status,
  statusColor,
  deadline,
  members,
}) => {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      <CardContent sx={{ padding: 3 }}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="start">
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
                {title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginBottom: 2 }}
              >
                {description}
              </Typography>
            </Box>
            <Chip
              label={status}
              size="small"
              sx={{
                backgroundColor: `${statusColor}20`,
                color: statusColor,
                fontWeight: 600,
              }}
            />
          </Stack>

          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ marginBottom: 1 }}
            >
              <Typography variant="caption" color="text.secondary">
                Progress
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, color: statusColor }}
              >
                {progress}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: `${statusColor}20`,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: statusColor,
                  borderRadius: 4,
                },
              }}
            />
          </Box>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
              <Stack direction="row" spacing={0.5} alignItems="center">
                <CalendarMonth sx={{ fontSize: 16, color: "text.secondary" }} />
                <Typography variant="caption" color="text.secondary">
                  {deadline}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Person sx={{ fontSize: 16, color: "text.secondary" }} />
                <Typography variant="caption" color="text.secondary">
                  {members} members
                </Typography>
              </Stack>
            </Stack>
            <AvatarGroup
              max={3}
              sx={{
                "& .MuiAvatar-root": {
                  width: 28,
                  height: 28,
                  fontSize: 12,
                  border: "2px solid white",
                },
              }}
            >
              {Array.from({ length: members }).map((_, i) => (
                <Avatar
                  key={i}
                  sx={{ backgroundColor: `hsl(${i * 60}, 70%, 60%)` }}
                >
                  {String.fromCharCode(65 + i)}
                </Avatar>
              ))}
            </AvatarGroup>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

const DetailProject = () => {
  const projects = [
    {
      title: "Website Redesign",
      description: "Complete redesign of company website with modern UI/UX",
      progress: 75,
      status: "In Progress",
      statusColor: "#667eea",
      deadline: "Dec 30, 2024",
      members: 5,
    },
    {
      title: "Mobile App Development",
      description: "Building cross-platform mobile application",
      progress: 90,
      status: "Review",
      statusColor: "#f093fb",
      deadline: "Jan 15, 2025",
      members: 4,
    },
    {
      title: "API Integration",
      description: "Integrating third-party APIs for enhanced functionality",
      progress: 45,
      status: "In Progress",
      statusColor: "#4facfe",
      deadline: "Feb 20, 2025",
      members: 3,
    },
    {
      title: "Database Migration",
      description: "Migrating legacy database to modern infrastructure",
      progress: 20,
      status: "Planning",
      statusColor: "#43e97b",
      deadline: "Mar 10, 2025",
      members: 4,
    },
    {
      title: "Security Audit",
      description: "Comprehensive security audit and penetration testing",
      progress: 60,
      status: "In Progress",
      statusColor: "#fa709a",
      deadline: "Jan 25, 2025",
      members: 2,
    },
    {
      title: "Performance Optimization",
      description: "Optimizing application performance and load times",
      progress: 85,
      status: "Testing",
      statusColor: "#fee140",
      deadline: "Dec 20, 2024",
      members: 3,
    },
  ];

  return (
    <SidebarLayout
      pageTitle="Daftar Proyek"
      breadcrumbs={[
        {
          label: "Projects",
          href: "/projects",
        },
      ]}
    >
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: 3 }}
        >
          <Box>
            <Typography variant="body1" color="text.secondary">
              Manage and track all your projects
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              borderRadius: "12px",
              padding: "10px 24px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
              fontWeight: 600,
              textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 30px rgba(102, 126, 234, 0.5)",
              },
            }}
          >
            New Project
          </Button>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </Box>
      </Box>
    </SidebarLayout>
  );
};
export default DetailProject;
